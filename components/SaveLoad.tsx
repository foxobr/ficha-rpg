import { useRef } from 'react';
import { Character } from '../types/character';
import { OrnamentalCard } from './OrnamentalCard';
import { Save, Upload, Download, Copy, Clipboard, Database, RotateCcw, FileText, Printer } from 'lucide-react';

interface SaveLoadProps {
  exportJSON: () => void;
  importJSON: (file: File) => Promise<void>;
  copyToClipboard: () => Promise<void>;
  pasteFromClipboard: () => Promise<void>;
  saveBackup: () => void;
  listBackups: () => Array<{ key: string; data: Character }>;
  restoreBackup: (key: string) => void;
  deleteBackup: (key: string) => void;
  resetCharacter: () => void;
  showStatus: (message: string, type?: string) => void;
}

export function SaveLoad({
  exportJSON,
  importJSON,
  copyToClipboard,
  pasteFromClipboard,
  saveBackup,
  listBackups,
  restoreBackup,
  deleteBackup,
  resetCharacter,
  showStatus
}: SaveLoadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportJSON = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importJSON(file);
        showStatus(`✅ Ficha importada com sucesso!`);
      } catch (error) {
        showStatus(`❌ Erro ao importar: ${error}`, 'error');
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await copyToClipboard();
      showStatus('📋 JSON copiado para clipboard!');
    } catch (error) {
      showStatus(`❌ Erro ao copiar: ${error}`, 'error');
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      await pasteFromClipboard();
      showStatus('📥 Ficha carregada do clipboard!');
    } catch (error) {
      showStatus(`❌ Erro ao colar JSON: ${error}`, 'error');
    }
  };

  const handleSaveBackup = () => {
    saveBackup();
    showStatus('📦 Backup salvo com sucesso!');
  };

  const handleRestoreBackup = () => {
    const backups = listBackups();
    if (backups.length === 0) {
      showStatus('⚠️ Nenhum backup encontrado!', 'warning');
      return;
    }

    // Create a simple modal
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: center; justify-content: center;';
    
    const content = document.createElement('div');
    content.style.cssText = 'background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); padding: 30px; border-radius: 8px; border: 2px solid #ff6b35; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;';
    
    content.innerHTML = `
      <h2 style="color: #ff6b35; margin-bottom: 15px;">Selecione um Backup</h2>
      ${backups.map(backup => `
        <div data-key="${backup.key}" style="background: #1a1a1a; padding: 10px; margin-bottom: 10px; border: 1px solid #ff6b35; border-radius: 4px; cursor: pointer;">
          <strong style="color: #ffb366;">${backup.data.characterName || 'Sem Nome'}</strong> (Nível ${backup.data.level || 0})<br>
          <small style="color: #888;">Classe: ${backup.data.characterClass || 'Sem Classe'}</small><br>
          <small style="color: #666;">Salvo: ${backup.data.backupTimestamp || 'Data desconhecida'}</small>
        </div>
      `).join('')}
      <button style="width: 100%; padding: 10px; background: #666; color: white; border: none; border-radius: 4px; margin-top: 10px; cursor: pointer;">Cancelar</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Handle clicks
    content.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const backupDiv = target.closest('[data-key]') as HTMLElement;
      
      if (backupDiv) {
        const key = backupDiv.getAttribute('data-key');
        if (key) {
          restoreBackup(key);
          showStatus('✅ Backup restaurado!');
          modal.remove();
        }
      } else if (target.tagName === 'BUTTON') {
        modal.remove();
      }
    });
  };

  const handleNewCharacter = () => {
    if (confirm('Tem certeza que deseja criar uma nova ficha? A atual será perdida!')) {
      resetCharacter();
      showStatus('🆕 Nova ficha criada!');
    }
  };

  const OrnamentalButton = ({ 
    onClick, 
    icon, 
    children, 
    variant = 'default' 
  }: { 
    onClick: () => void; 
    icon: React.ReactNode; 
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'info' | 'danger' | 'purple';
  }) => {
    const getVariantColors = () => {
      switch (variant) {
        case 'success':
          return {
            from: '#00FF41',
            to: '#00FF41',
            border: '#00FF41',
            text: 'text-black'
          };
        case 'info':
          return {
            from: '#2196F3',
            to: '#42A5F5',
            border: '#2196F3',
            text: 'text-white'
          };
        case 'danger':
          return {
            from: '#8B0000',
            to: '#8B0000',
            border: '#ff6b35',
            text: 'text-white'
          };
        case 'purple':
          return {
            from: '#9C27B0',
            to: '#BA68C8',
            border: '#9C27B0',
            text: 'text-white'
          };
        default:
          return {
            from: '#D4A574',
            to: '#D4A574',
            border: '#D4A574',
            text: 'text-black'
          };
      }
    };

    const colors = getVariantColors();

    return (
      <button
        onClick={onClick}
        className={`relative px-4 py-3 bg-gradient-to-r uppercase tracking-wider border-2 transition-all hover:shadow-[0_0_15px_rgba(212,165,116,0.5)] active:translate-y-0.5 overflow-hidden group ${colors.text}`}
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.from}CC, ${colors.to}99)`,
          borderColor: colors.border
        }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
          {icon}
          <span>{children}</span>
        </span>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t opacity-50" style={{ borderColor: colors.border }} />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t opacity-50" style={{ borderColor: colors.border }} />
      </button>
    );
  };

  return (
    <OrnamentalCard title="Salvar e Carregar" icon={<Save />} className="col-span-2 animate-[fadeIn_1.7s_ease-out]">
      {/* Main Actions */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 mb-6">
        <OrnamentalButton onClick={exportJSON} icon={<Download size={16} />} variant="success">
          Baixar JSON
        </OrnamentalButton>
        <OrnamentalButton onClick={handleImportJSON} icon={<Upload size={16} />} variant="info">
          Importar JSON
        </OrnamentalButton>
        <OrnamentalButton onClick={handleNewCharacter} icon={<FileText size={16} />} variant="danger">
          Nova Ficha
        </OrnamentalButton>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D4A574]/30" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-black px-4 text-[#D4A574] text-sm uppercase tracking-wider">
            Exportar / Importar JSON
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 mb-6">
        <OrnamentalButton onClick={handleCopyToClipboard} icon={<Copy size={16} />} variant="info">
          Copiar JSON
        </OrnamentalButton>
        <OrnamentalButton onClick={handlePasteFromClipboard} icon={<Clipboard size={16} />} variant="info">
          Colar JSON
        </OrnamentalButton>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D4A574]/30" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-black px-4 text-[#D4A574] text-sm uppercase tracking-wider">
            Backup
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 mb-6">
        <OrnamentalButton onClick={handleSaveBackup} icon={<Database size={16} />} variant="success">
          Fazer Backup
        </OrnamentalButton>
        <OrnamentalButton onClick={handleRestoreBackup} icon={<RotateCcw size={16} />} variant="info">
          Restaurar Backup
        </OrnamentalButton>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D4A574]/30" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-black px-4 text-[#D4A574] text-sm uppercase tracking-wider">
            Outros
          </span>
        </div>
      </div>

      <OrnamentalButton onClick={() => window.print()} icon={<Printer size={16} />} variant="purple">
        Imprimir
      </OrnamentalButton>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </OrnamentalCard>
  );
}