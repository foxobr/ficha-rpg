import { useState } from 'react';
import { useCharacter } from './hooks/useCharacter';
import { BasicInfo } from './components/BasicInfo';
import { Attributes } from './components/Attributes';
import { ClassSelection } from './components/ClassSelection';
import { Stats } from './components/Stats';
import { Equipment } from './components/Equipment';
import { Skills } from './components/Skills';
import { DiceRoller } from './components/DiceRoller';
import { SkillTest } from './components/SkillTest';
import { DamageCalculator } from './components/DamageCalculator';
import { Resources } from './components/Resources';
import { Conditions } from './components/Conditions';
import { CombatLog } from './components/CombatLog';
import { NPCGenerator } from './components/NPCGenerator';
import { SaveLoad } from './components/SaveLoad';
import { StatusBar } from './components/StatusBar';
import { SandParticles } from './components/SandParticles';
import { GlitchEffect } from './components/GlitchEffect';
import { ScanLines } from './components/ScanLines';
import { HolographicOverlay } from './components/HolographicOverlay';
import { SandStorm } from './components/SandStorm';
import { OrnamentalHeader } from './components/OrnamentalHeader';

export default function App() {
  const {
    character,
    updateCharacter,
    resetCharacter,
    exportJSON,
    importJSON,
    copyToClipboard,
    pasteFromClipboard,
    saveBackup,
    listBackups,
    restoreBackup,
    deleteBackup
  } = useCharacter();

  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | 'warning'>('success');

  const showStatus = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setStatusMessage(message);
    setStatusType(type);
  };

  const addCombatLog = (action: string) => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    updateCharacter({
      combatLog: [...character.combatLog, { action, timestamp }]
    });
  };

  const handleAddSkills = (skills: string[]) => {
    const uniqueSkills = [...new Set([...character.skills, ...skills])];
    updateCharacter({ skills: uniqueSkills });
  };

  return (
    <div className="min-h-screen p-5">
      {/* Visual Effects Layer */}
      <SandParticles />
      <ScanLines />
      <HolographicOverlay />
      <GlitchEffect />
      <SandStorm />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Ornamental Header */}
        <OrnamentalHeader 
          title="FICHA DE PERSONAGEM" 
          subtitle="Sombras do Deserto - Sistema RPG"
        />

        <div className="grid grid-cols-2 gap-5 mb-8">
          <BasicInfo character={character} onChange={updateCharacter} />
          <Attributes character={character} onChange={updateCharacter} />
          <ClassSelection
            character={character}
            onChange={updateCharacter}
            onAddSkills={handleAddSkills}
            showStatus={showStatus}
          />
          <Stats character={character} onChange={updateCharacter} />
          <Equipment character={character} onChange={updateCharacter} />
          <Skills
            character={character}
            onChange={updateCharacter}
            showStatus={showStatus}
          />
          <DiceRoller />
          <SkillTest onAddLog={addCombatLog} />
          <DamageCalculator />
          <Resources character={character} onChange={updateCharacter} />
          <Conditions
            character={character}
            onChange={updateCharacter}
            onAddLog={addCombatLog}
          />
          <NPCGenerator />
          <CombatLog character={character} onChange={updateCharacter} />
          <SaveLoad
            exportJSON={exportJSON}
            importJSON={importJSON}
            copyToClipboard={copyToClipboard}
            pasteFromClipboard={pasteFromClipboard}
            saveBackup={saveBackup}
            listBackups={listBackups}
            restoreBackup={restoreBackup}
            deleteBackup={deleteBackup}
            resetCharacter={resetCharacter}
            showStatus={showStatus}
          />
        </div>

        {statusMessage && (
          <StatusBar
            message={statusMessage}
            type={statusType}
            onHide={() => setStatusMessage('')}
          />
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }

        @media print {
          button {
            display: none !important;
          }
          .grid {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}