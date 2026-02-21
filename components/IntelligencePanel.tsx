
import React from 'react';

interface IntelligencePanelProps {
  content: string;
  onClose: () => void;
}

const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-[#080B14] border-l-4 border-accent p-8 shadow-2xl h-[80vh] flex flex-col animate-in slide-in-from-bottom duration-500">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-display text-2xl font-black text-accent tracking-tighter uppercase mb-1">
              Tactical Intel Report
            </h2>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-accent/20 text-accent text-[10px] font-display font-bold">TOP SECRET</span>
              <span className="px-2 py-0.5 bg-gray-800 text-gray-400 text-[10px] font-display font-bold uppercase">UPLINK_SUCCESSFUL</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 font-body text-gray-300 space-y-4 leading-relaxed tracking-wide text-lg">
          {content.split('\n').map((para, i) => (
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between text-[10px] font-display text-gray-600 tracking-[0.3em]">
          <span>GRIDLOCK PROTOCOL 04-X</span>
          <span className="animate-pulse">DECRYPTING LOGS...</span>
        </div>

        {/* Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>
      </div>
    </div>
  );
};

export default IntelligencePanel;
