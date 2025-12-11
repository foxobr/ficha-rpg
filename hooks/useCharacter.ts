import { useState, useEffect, useCallback } from 'react';
import { Character, Resources } from '../types/character';

const INITIAL_CHARACTER: Character = {
  id: '',
  characterName: '',
  playerName: '',
  level: 1,
  experiencePoints: 0,
  maxHP: 10,
  currentHP: 10,
  background: '',
  strength: 1,
  agility: 1,
  intelligence: 1,
  charisma: 1,
  vigor: 1,
  characterClass: '',
  va: 0,
  weapons: '',
  armor: '',
  items: '',
  skills: [],
  trainedSkills: {},
  activeConditions: [],
  combatLog: [],
  resources: {
    energy: 10,
    maxEnergy: 10,
    ammo: 0,
    food: 5,
    water: 5
  }
};

export const useCharacter = () => {
  const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Load character on mount
  useEffect(() => {
    const saved = localStorage.getItem('shadowsCharacterAuto');
    if (saved) {
      try {
        setCharacter(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading character:', error);
      }
    }
  }, []);

  // Auto-save
  const autoSave = useCallback(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    const timer = setTimeout(() => {
      const characterToSave = {
        ...character,
        timestamp: new Date().toLocaleString('pt-BR')
      };
      localStorage.setItem('shadowsCharacter', JSON.stringify(characterToSave));
      localStorage.setItem('shadowsCharacterAuto', JSON.stringify(characterToSave));
    }, 1000);
    
    setAutoSaveTimer(timer);
  }, [character, autoSaveTimer]);

  useEffect(() => {
    autoSave();
  }, [character]);

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const resetCharacter = () => {
    setCharacter(INITIAL_CHARACTER);
    localStorage.removeItem('shadowsCharacter');
    localStorage.removeItem('shadowsCharacterAuto');
  };

  const loadCharacter = (data: Character) => {
    setCharacter(data);
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${character.characterName || 'personagem'}_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          loadCharacter(data);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const copyToClipboard = async () => {
    const dataStr = JSON.stringify(character, null, 2);
    await navigator.clipboard.writeText(dataStr);
  };

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    const data = JSON.parse(text);
    loadCharacter(data);
  };

  const saveBackup = () => {
    const backupKey = `character_backup_${Date.now()}`;
    const backupData = {
      ...character,
      backupTimestamp: new Date().toLocaleString('pt-BR')
    };
    localStorage.setItem(backupKey, JSON.stringify(backupData));
  };

  const listBackups = (): Array<{ key: string; data: Character }> => {
    const backups: Array<{ key: string; data: Character }> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('character_backup_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '');
          backups.push({ key, data });
        } catch (error) {
          console.error('Error loading backup:', error);
        }
      }
    }
    return backups.sort((a, b) => b.key.localeCompare(a.key));
  };

  const restoreBackup = (key: string) => {
    const backup = localStorage.getItem(key);
    if (backup) {
      loadCharacter(JSON.parse(backup));
    }
  };

  const deleteBackup = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    character,
    updateCharacter,
    resetCharacter,
    loadCharacter,
    exportJSON,
    importJSON,
    copyToClipboard,
    pasteFromClipboard,
    saveBackup,
    listBackups,
    restoreBackup,
    deleteBackup
  };
};
