import { X } from 'lucide-react';

interface OrnamentalListProps {
  items: string[];
  onRemove: (index: number) => void;
  emptyMessage?: string;
}

export function OrnamentalList({ items, onRemove, emptyMessage = 'Nenhum item adicionado' }: OrnamentalListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-[#888] relative">
        <div className="absolute inset-0 border border-dashed border-[#D4A574]/30" />
        <div className="relative z-10 uppercase tracking-wider text-sm">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative group bg-gradient-to-r from-black/60 to-[#1a1a1a]/40 border-l-4 border-[#D4A574] pl-4 pr-12 py-3 hover:border-[#00FF41] hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all"
        >
          {/* Item text */}
          <div className="text-[#e0e0e0] relative z-10">
            {item}
          </div>

          {/* Decorative line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#D4A574]/50 via-[#ff6b35]/30 to-transparent" />

          {/* Delete button */}
          <button
            onClick={() => onRemove(index)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border-2 border-[#8B0000] bg-black/80 text-[#ff6b35] opacity-0 group-hover:opacity-100 hover:border-[#ff6b35] hover:bg-[#8B0000]/30 hover:shadow-[0_0_10px_rgba(139,0,0,0.5)] transition-all"
            title="Remover"
          >
            <X size={16} />
          </button>

          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
}
