# Sistema de Fichas Sombras do Deserto

## Visão Geral

Sistema completo de gerenciamento de fichas de personagem com autenticação, sessões multiplayer e painel administrativo para mestres de RPG.

## Funcionalidades Implementadas

### 1. Sistema de Autenticação
- **Cadastro de usuários** (jogadores e mestres)
- **Login/Logout** com Supabase Auth
- **Sessões persistentes**
- Automaticamente confirma email (sem necessidade de servidor de email)

### 2. Sistema de Perícias Treinadas
Lista completa de 63 perícias organizadas em 10 categorias:
- **Armas** (12 perícias)
- **Combate Corpo a Corpo** (4 perícias)
- **Sobrevivência** (5 perícias)
- **Conhecimento** (4 perícias)
- **Engenharia e Tecnologia** (3 perícias)
- **Interação Social** (3 perícias)
- **Furtividade** (3 perícias)
- **Medicina** (6 perícias)
- **Pilotagem** (5 perícias)
- **Artes e Ofícios** (4 perícias)

Cada perícia possui:
- Categoria de origem
- Atributo(s) associado(s) (FOR, AGI, INT, CAR, VIG)
- Bônus de treinamento (começa em +3)

### 3. Sistema de Nivelamento
- **Nível inicial**: 1
- **A cada nível**:
  - +5 HP (máximo e atual)
  - Escolha uma opção:
    - Treinar nova perícia (+3)
    - Melhorar perícia existente (+3 adicional)

### 4. Painel do Mestre (Admin)
- **Criar múltiplas sessões** de jogo
- **Visualizar todos os jogadores** conectados em tempo real
- **Ver fichas completas** dos personagens
- **Aplicar/remover condições** nos jogadores remotamente
- **Monitorar status** (online/offline)
- **Atualização automática** a cada 5 segundos

### 5. Interface do Jogador
- **Entrar em sessão** com ID fornecido pelo mestre
- **Criar e editar personagem** completo
- **Sistema de auto-save** a cada 30 segundos
- **Todas as funcionalidades** da ficha original:
  - Atributos, classes, equipamentos
  - Perícias treinadas com bônus
  - Sistema de recursos
  - Condições e combate
  - Rolagem de dados
  - Calculadoras
  - Gerador de NPC
  - Histórico de combate

### 6. Persistência de Dados
- **Backend integrado** com Supabase
- **Banco de dados** compartilhado entre jogadores e mestre
- **Sincronização em tempo real**
- **Auto-save periódico**

## Como Usar

### Para Mestres (Admin)

1. **Criar conta** escolhendo "Mestre"
2. **Criar nova sessão** no painel
3. **Compartilhar ID da sessão** com os jogadores
4. **Monitorar jogadores** e aplicar efeitos em tempo real

### Para Jogadores

1. **Criar conta** escolhendo "Jogador"
2. **Pedir ID da sessão** ao mestre
3. **Entrar na sessão**
4. **Criar/editar personagem**
5. **Sistema salva automaticamente**

## Mecânicas do Sistema

### Cálculo de HP
```
HP Inicial = 10 (nível 1)
HP por Nível = HP Atual + 5
HP no Nível 5 = 10 + (4 × 5) = 30 HP
```

### Sistema de Perícias
```
Perícia Não Treinada = Atributo
Perícia Treinada Nível 1 = Atributo + 3
Melhorar Perícia = Bônus Atual + 3

Exemplo:
- Hacking (INT 4) não treinado = +4
- Hacking treinado = +4 (INT) +3 (treino) = +7
- Hacking melhorado = +4 (INT) +6 (treino) = +10
```

### Condições Disponíveis
- Envenenado ☠️
- Queimado 🔥
- Congelado ❄️
- Paralizado ⚡
- Cego 🙈
- Surdo 👂
- Assustado 👻
- Sangrando 🩸
- Fraco 😰
- Atordoado 💫

## Estrutura do Código

### Componentes Principais
- `/components/Login.tsx` - Sistema de autenticação
- `/components/AdminPanel.tsx` - Painel do mestre
- `/components/PlayerView.tsx` - Interface do jogador
- `/components/TrainedSkills.tsx` - Sistema de perícias
- `/components/LevelUp.tsx` - Sistema de nivelamento

### Tipos
- `/types/character.ts` - Estrutura do personagem
- `/types/skills.ts` - Lista e estrutura de perícias
- `/types/session.ts` - Tipos de sessão e usuários

### Backend
- `/supabase/functions/server/index.tsx` - API REST completa

### Rotas da API
```
POST   /signup                - Criar conta
GET    /user                  - Obter info do usuário
POST   /session               - Criar sessão (admin)
GET    /session/:id           - Obter sessão
POST   /session/:id/join      - Entrar na sessão
POST   /character             - Salvar personagem
GET    /character/:sid/:uid   - Carregar personagem
POST   /admin/condition       - Aplicar condição (admin)
GET    /admin/sessions        - Listar sessões (admin)
```

## Estilo Visual

Mantém a **estética ornamentada cyberpunk/deserto** com:
- Paleta de cores: dourado (#D4A574), néon verde (#00FF41), vermelho (#8B0000), laranja (#ff6b35)
- Bordas decorativas ornamentadas
- Efeitos de partículas e tempestade de areia
- Tipografia futurista
- Elementos holográficos

## Próximas Expansões Possíveis

1. Sistema de XP com progressão automática
2. Chat em tempo real entre jogadores
3. Mapas compartilhados
4. Sistema de inventário visual
5. Árvores de talentos por classe
6. Sistema de missões/quests
7. Histórico de sessões
8. Fichas de NPCs persistentes
9. Sistema de combate turn-based
10. Importação de PDFs de fichas
