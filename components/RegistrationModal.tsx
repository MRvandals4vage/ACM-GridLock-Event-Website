
import React, { useState } from 'react';
import { generateIntelReport } from '../services/gemini';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIntelGenerated: (intel: string) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onIntelGenerated }) => {
  const [name, setName] = useState('');
  const [faction, setFaction] = useState<'RANGER' | 'VILLAIN'>('RANGER');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const report = await generateIntelReport(name, faction);
      onIntelGenerated(report);
    } catch (error) {
      console.error("Intel retrieval failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-surface-dark border-t-2 border-b-2 border-primary p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <span className="material-icons">close</span>
        </button>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2 uppercase tracking-tighter">
          Intelligence Gathering
        </h2>
        <p className="text-gray-400 mb-8 font-body tracking-wider">
          Enlist in the database to receive your tactical briefing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-display text-primary uppercase tracking-widest mb-2">Callsign / Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background-dark border border-gray-700 text-white p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body uppercase tracking-widest"
              placeholder="ENTER CALLSIGN..."
            />
          </div>

          <div>
            <label className="block text-xs font-display text-primary uppercase tracking-widest mb-2">Alignment</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFaction('RANGER')}
                className={`p-4 border font-display text-sm tracking-widest transition-all ${faction === 'RANGER'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-700 text-gray-500 hover:border-gray-500'
                  }`}
              >
                RANGER
              </button>
              <button
                type="button"
                onClick={() => setFaction('VILLAIN')}
                className={`p-4 border font-display text-sm tracking-widest transition-all ${faction === 'VILLAIN'
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-gray-700 text-gray-500 hover:border-gray-500'
                  }`}
              >
                VILLAIN
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-background-dark font-display font-black uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-background-dark border-t-transparent rounded-full animate-spin"></div>
                UPLOADING...
              </>
            ) : (
              'INITIATE UPLINK'
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale pointer-events-none">
          <span className="material-icons text-4xl text-primary">security</span>
          <span className="material-icons text-4xl text-primary">memory</span>
          <span className="material-icons text-4xl text-primary">hub</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
