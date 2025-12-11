// Tipos de atributos
export type AttributeType = 'FOR' | 'AGI' | 'INT' | 'CAR' | 'VIG';

// Estrutura de uma perícia
export interface Skill {
  name: string;
  category: string;
  attributes: AttributeType[];
}

// Estrutura de perícia treinada do personagem
export interface TrainedSkill {
  name: string;
  level: number; // Bônus de treinamento (+3, +6, +9, etc.)
  category: string;
}

// Categorias e perícias disponíveis
export const SKILL_CATEGORIES = {
  'Armas': [
    { name: 'Lâminas Curtas', attributes: ['AGI'] as AttributeType[] },
    { name: 'Lâminas Longas', attributes: ['FOR'] as AttributeType[] },
    { name: 'Arremesso', attributes: ['AGI'] as AttributeType[] },
    { name: 'Pistolas', attributes: ['AGI'] as AttributeType[] },
    { name: 'Espingardas', attributes: ['FOR'] as AttributeType[] },
    { name: 'Rifles', attributes: ['AGI', 'FOR'] as AttributeType[] },
    { name: 'Armas de Precisão', attributes: ['AGI', 'FOR', 'INT'] as AttributeType[] },
    { name: 'Pistolas de Energia', attributes: ['AGI'] as AttributeType[] },
    { name: 'Rifles de Energia', attributes: ['AGI', 'INT'] as AttributeType[] },
    { name: 'Canhões de Plasma', attributes: ['INT'] as AttributeType[] },
    { name: 'Arcos de Energia', attributes: ['AGI'] as AttributeType[] },
    { name: 'Lâminas de Luz', attributes: ['AGI'] as AttributeType[] },
  ],
  'Combate Corpo a Corpo': [
    { name: 'Artes Marciais', attributes: ['AGI'] as AttributeType[] },
    { name: 'Luta Livre', attributes: ['FOR'] as AttributeType[] },
    { name: 'Uso de Armas Improvisadas', attributes: ['INT'] as AttributeType[] },
    { name: 'Combate com Escudos', attributes: ['VIG'] as AttributeType[] },
  ],
  'Sobrevivência': [
    { name: 'Rastreamento', attributes: ['INT'] as AttributeType[] },
    { name: 'Identificação de Plantas e Animais', attributes: ['INT'] as AttributeType[] },
    { name: 'Construção de Abrigos', attributes: ['INT'] as AttributeType[] },
    { name: 'Purificação de Água', attributes: ['INT'] as AttributeType[] },
    { name: 'Orientação por Estrelas', attributes: ['INT'] as AttributeType[] },
  ],
  'Conhecimento': [
    { name: 'História', attributes: ['INT'] as AttributeType[] },
    { name: 'Química', attributes: ['INT'] as AttributeType[] },
    { name: 'Ciências Naturais', attributes: ['INT'] as AttributeType[] },
    { name: 'Línguas Antigas', attributes: ['INT'] as AttributeType[] },
  ],
  'Engenharia e Tecnologia': [
    { name: 'Engenharia Mecânica', attributes: ['INT'] as AttributeType[] },
    { name: 'Engenharia Eletrônica', attributes: ['INT'] as AttributeType[] },
    { name: 'Hacking', attributes: ['INT'] as AttributeType[] },
  ],
  'Interação Social': [
    { name: 'Intimidação', attributes: ['CAR'] as AttributeType[] },
    { name: 'Diplomacia', attributes: ['CAR'] as AttributeType[] },
    { name: 'Enganação', attributes: ['CAR'] as AttributeType[] },
  ],
  'Furtividade': [
    { name: 'Furtividade', attributes: ['AGI'] as AttributeType[] },
    { name: 'Disfarce', attributes: ['CAR'] as AttributeType[] },
    { name: 'Arrombamento', attributes: ['FOR', 'AGI'] as AttributeType[] },
  ],
  'Medicina': [
    { name: 'Primeiros Socorros', attributes: ['INT'] as AttributeType[] },
    { name: 'Cirurgia', attributes: ['INT'] as AttributeType[] },
    { name: 'Farmacologia', attributes: ['INT'] as AttributeType[] },
    { name: 'Diagnóstico', attributes: ['INT'] as AttributeType[] },
    { name: 'Terapia', attributes: ['CAR'] as AttributeType[] },
    { name: 'Medicina Alternativa', attributes: ['CAR', 'INT'] as AttributeType[] },
  ],
  'Pilotagem': [
    { name: 'Pilotagem de Veículos Terrestres', attributes: ['AGI'] as AttributeType[] },
    { name: 'Pilotagem de Aeronaves', attributes: ['AGI'] as AttributeType[] },
    { name: 'Pilotagem de Naves Espaciais', attributes: ['INT'] as AttributeType[] },
    { name: 'Manobras de Evasão', attributes: ['AGI'] as AttributeType[] },
    { name: 'Corridas de Alta Velocidade', attributes: ['AGI'] as AttributeType[] },
  ],
  'Artes e Ofícios': [
    { name: 'Pintura', attributes: ['AGI'] as AttributeType[] },
    { name: 'Escultura', attributes: ['INT'] as AttributeType[] },
    { name: 'Música', attributes: ['INT'] as AttributeType[] },
    { name: 'Criação', attributes: ['INT', 'AGI', 'FOR'] as AttributeType[] },
  ],
};

// Função auxiliar para obter todas as perícias
export const getAllSkills = (): Skill[] => {
  const allSkills: Skill[] = [];
  
  Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
    skills.forEach(skill => {
      allSkills.push({
        name: skill.name,
        category,
        attributes: skill.attributes,
      });
    });
  });
  
  return allSkills;
};

// Função auxiliar para obter perícia por nome
export const getSkillByName = (name: string): Skill | undefined => {
  return getAllSkills().find(skill => skill.name === name);
};
