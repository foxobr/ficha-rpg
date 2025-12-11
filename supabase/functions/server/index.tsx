import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ace937eb/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== AUTH ROUTES ====================

// Sign up
app.post("/make-server-ace937eb/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, senha e nome são obrigatórios' }, 400);
    }

    // Create user in Supabase Auth
    // Automatically confirm the user's email since an email server hasn't been configured
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: role || 'player' },
      email_confirm: true
    });

    if (authError) {
      console.log('Auth error during sign up:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store user info in KV
    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email,
      name,
      role: role || 'player',
    });

    return c.json({ 
      success: true, 
      user: authData.user,
      message: 'Usuário criado com sucesso!'
    });
  } catch (error) {
    console.log('Error during sign up:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get current user info (requires auth token)
app.get("/make-server-ace937eb/user", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Token de autorização não fornecido' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    // Get additional user info from KV
    const userInfo = await kv.get(`user:${user.id}`);

    return c.json({ 
      user: {
        id: user.id,
        email: user.email,
        ...userInfo,
      }
    });
  } catch (error) {
    console.log('Error getting user:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ==================== SESSION ROUTES ====================

// Create session (admin only)
app.post("/make-server-ace937eb/session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const userInfo = await kv.get(`user:${user.id}`);
    if (!userInfo || userInfo.role !== 'admin') {
      return c.json({ error: 'Apenas administradores podem criar sessões' }, 403);
    }

    const { name } = await c.req.json();
    const sessionId = crypto.randomUUID();

    const session = {
      id: sessionId,
      name,
      adminId: user.id,
      createdAt: new Date().toISOString(),
      players: [],
    };

    await kv.set(`session:${sessionId}`, session);
    
    return c.json({ success: true, session });
  } catch (error) {
    console.log('Error creating session:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get session by ID
app.get("/make-server-ace937eb/session/:id", async (c) => {
  try {
    const sessionId = c.req.param('id');
    const session = await kv.get(`session:${sessionId}`);
    
    if (!session) {
      return c.json({ error: 'Sessão não encontrada' }, 404);
    }

    return c.json({ session });
  } catch (error) {
    console.log('Error getting session:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Join session (player)
app.post("/make-server-ace937eb/session/:id/join", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const sessionId = c.req.param('id');
    const session = await kv.get(`session:${sessionId}`);
    
    if (!session) {
      return c.json({ error: 'Sessão não encontrada' }, 404);
    }

    const userInfo = await kv.get(`user:${user.id}`);
    
    // Check if player already in session
    const existingPlayer = session.players.find((p: any) => p.userId === user.id);
    if (!existingPlayer) {
      session.players.push({
        userId: user.id,
        userName: userInfo?.name || user.email,
        character: null,
        isOnline: true,
        lastActive: new Date().toISOString(),
      });
      
      await kv.set(`session:${sessionId}`, session);
    }

    return c.json({ success: true, session });
  } catch (error) {
    console.log('Error joining session:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ==================== CHARACTER ROUTES ====================

// Save character to session
app.post("/make-server-ace937eb/character", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const { sessionId, character } = await c.req.json();
    
    // Get session
    const session = await kv.get(`session:${sessionId}`);
    if (!session) {
      return c.json({ error: 'Sessão não encontrada' }, 404);
    }

    // Update character in session
    const playerIndex = session.players.findIndex((p: any) => p.userId === user.id);
    if (playerIndex === -1) {
      return c.json({ error: 'Jogador não está na sessão' }, 403);
    }

    character.id = character.id || crypto.randomUUID();
    character.sessionId = sessionId;
    session.players[playerIndex].character = character;
    session.players[playerIndex].lastActive = new Date().toISOString();

    await kv.set(`session:${sessionId}`, session);
    
    return c.json({ success: true, character });
  } catch (error) {
    console.log('Error saving character:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get character from session
app.get("/make-server-ace937eb/character/:sessionId/:userId", async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const userId = c.req.param('userId');
    
    const session = await kv.get(`session:${sessionId}`);
    if (!session) {
      return c.json({ error: 'Sessão não encontrada' }, 404);
    }

    const player = session.players.find((p: any) => p.userId === userId);
    if (!player) {
      return c.json({ error: 'Jogador não encontrado na sessão' }, 404);
    }

    return c.json({ character: player.character });
  } catch (error) {
    console.log('Error getting character:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ==================== ADMIN ROUTES ====================

// Apply condition to player (admin only)
app.post("/make-server-ace937eb/admin/condition", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const userInfo = await kv.get(`user:${user.id}`);
    if (!userInfo || userInfo.role !== 'admin') {
      return c.json({ error: 'Apenas administradores podem aplicar condições' }, 403);
    }

    const { sessionId, targetUserId, condition, action } = await c.req.json();
    
    const session = await kv.get(`session:${sessionId}`);
    if (!session) {
      return c.json({ error: 'Sessão não encontrada' }, 404);
    }

    const playerIndex = session.players.findIndex((p: any) => p.userId === targetUserId);
    if (playerIndex === -1) {
      return c.json({ error: 'Jogador não encontrado' }, 404);
    }

    const character = session.players[playerIndex].character;
    if (!character) {
      return c.json({ error: 'Personagem não encontrado' }, 404);
    }

    if (action === 'add') {
      if (!character.activeConditions.includes(condition)) {
        character.activeConditions.push(condition);
      }
    } else if (action === 'remove') {
      character.activeConditions = character.activeConditions.filter((c: string) => c !== condition);
    }

    session.players[playerIndex].character = character;
    await kv.set(`session:${sessionId}`, session);

    return c.json({ success: true, character });
  } catch (error) {
    console.log('Error applying condition:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get all admin sessions
app.get("/make-server-ace937eb/admin/sessions", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const userInfo = await kv.get(`user:${user.id}`);
    if (!userInfo || userInfo.role !== 'admin') {
      return c.json({ error: 'Apenas administradores' }, 403);
    }

    // Get all sessions for this admin
    const allKeys = await kv.getByPrefix('session:');
    const adminSessions = allKeys.filter((s: any) => s.adminId === user.id);

    return c.json({ sessions: adminSessions });
  } catch (error) {
    console.log('Error getting admin sessions:', error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);