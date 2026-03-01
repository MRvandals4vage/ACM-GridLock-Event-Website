import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Member {
  name: string;
  regNo: string;
  phone: string;
  email: string;
  department: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIntelGenerated: (intel: string) => void;
}

type Phase = 'SQUAD' | 'CAPTAIN' | 'ADVISOR' | 'SUPPORT' | 'VERIFY';

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onIntelGenerated }) => {
  const [phase, setPhase] = useState<Phase>('SQUAD');
  const [loading, setLoading] = useState(false);

  // Squad Data
  const [teamName, setTeamName] = useState('');
  const [faction, setFaction] = useState<'RANGER' | 'VILLAIN'>('RANGER');

  // Captain Data
  const [leader, setLeader] = useState({
    name: '',
    regNo: '',
    email: '',
    phone: '',
    department: '',
    year: 'Select year'
  });

  // Advisor Data
  const [advisor, setAdvisor] = useState({
    name: '',
    email: ''
  });

  // Members Data
  const [members, setMembers] = useState<Member[]>([
    { name: '', regNo: '', phone: '', email: '', department: '' },
    { name: '', regNo: '', phone: '', email: '', department: '' }
  ]);

  const [remainingSeats, setRemainingSeats] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/remaining-seats')
      .then(res => res.json())
      .then(data => setRemainingSeats(data.remainingTeams))
      .catch(err => console.error("Failed to load seats", err));
  }, []);

  if (!isOpen) return null;

  const handleMemberChange = (index: number, field: keyof Member, value: string) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const addMember = () => {
    if (members.length < 3) {
      setMembers([...members, { name: '', regNo: '', phone: '', email: '', department: '' }]);
    }
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhaseValid()) return;

    setLoading(true);
    try {
      // 1. Database Registration
      const registrationResponse = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team_name: teamName,
          faction,
          leader_name: leader.name,
          leader_reg_no: leader.regNo,
          leader_email: leader.email,
          leader_phone: leader.phone,
          leader_department: leader.department,
          leader_year: leader.year,
          advisor_name: advisor.name,
          advisor_email: advisor.email,
          members
        })
      });

      const regResult = await registrationResponse.json();

      if (!registrationResponse.ok) {
        alert(regResult.error || 'Mobilization failed. Please check your data.');
        return;
      }

      // 2. Intelligence Report Generation (Success Path)
      const intelResponse = await fetch('/api/intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${teamName} (Lead: ${leader.name}, Advisor: ${advisor.name})`,
          faction
        })
      });

      const intelData = await intelResponse.json();

      if (!intelResponse.ok) {
        throw new Error(intelData.error || 'Failed to generate intel.');
      }

      onIntelGenerated(intelData.intel);

    } catch (error) {
      console.error("Critical mission failure:", error);
      alert('Network uplink lost. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  const isPhaseValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const regNoRegex = /^RA\d{12,}$/;

    switch (phase) {
      case 'SQUAD':
        return teamName.trim().length > 0;
      case 'CAPTAIN':
        return (
          leader.name.trim().length > 0 &&
          regNoRegex.test(leader.regNo) &&
          emailRegex.test(leader.email) &&
          phoneRegex.test(leader.phone) &&
          leader.department.trim().length > 0 &&
          leader.year !== 'Select year'
        );
      case 'ADVISOR':
        return (
          advisor.name.trim().length > 0 &&
          emailRegex.test(advisor.email)
        );
      case 'SUPPORT':
        return members.every(m =>
          m.name.trim().length > 0 &&
          regNoRegex.test(m.regNo) &&
          phoneRegex.test(m.phone) &&
          emailRegex.test(m.email) &&
          m.department.trim().length > 0
        );
      case 'VERIFY':
        return true;
      default:
        return false;
    }
  };

  const phases: Phase[] = ['SQUAD', 'CAPTAIN', 'ADVISOR', 'SUPPORT', 'VERIFY'];
  const currentPhaseIndex = phases.indexOf(phase);

  const nextPhase = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPhaseValid() && currentPhaseIndex < phases.length - 1) {
      setPhase(phases[currentPhaseIndex + 1]);
    }
  };

  const prevPhase = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPhaseIndex > 0) {
      setPhase(phases[currentPhaseIndex - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header Section */}
        <div className="p-8 pb-4 flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-none">
              INITIATE <span className="text-primary italic">UPLINK</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-primary/40 font-display text-[9px] tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                PROTOCOL VERSION 7.4.1
              </div>
              {remainingSeats !== null && (
                <div className="px-2 py-0.5 border border-primary/20 rounded text-[9px] font-display text-primary tracking-widest bg-primary/5 uppercase">
                  SEATS LEFT: {remainingSeats}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-white/40 hover:text-white"
          >
            <span className="material-icons text-xl">close</span>
          </button>
        </div>

        {/* Smooth Phase Indicator */}
        <div className="px-10 py-2">
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${((currentPhaseIndex + 1) / phases.length) * 100}%` }}
              className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_#00E5FF]"
            />
          </div>
        </div>

        {/* Main Form Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-8"
            >
              {phase === 'SQUAD' && (
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-lg font-display text-white italic tracking-widest uppercase">01. Team Designation</h3>
                    <div className="relative group">
                      <input
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-white/10 text-white p-4 focus:border-primary outline-none font-display uppercase tracking-widest text-2xl transition-all"
                        placeholder="SQUAD NAME HERE..."
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[10px] font-display text-primary/60 uppercase tracking-widest">Select Your Faction</p>
                    <div className="grid grid-cols-2 gap-6">
                      {['RANGER', 'VILLAIN'].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFaction(f as any)}
                          className={`group relative py-8 px-4 rounded-3xl border-2 transition-all duration-500 overflow-hidden ${faction === f
                            ? (f === 'RANGER' ? 'border-primary bg-primary/10' : 'border-secondary bg-secondary/10')
                            : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                            }`}
                        >
                          <span className={`text-xl font-display font-black italic tracking-widest transition-colors ${faction === f ? (f === 'RANGER' ? 'text-primary' : 'text-secondary') : 'text-white/20'
                            }`}>
                            {f}
                          </span>
                          {faction === f && (
                            <motion.div
                              layoutId="glow"
                              className={`absolute inset-0 blur-2xl opacity-20 ${f === 'RANGER' ? 'bg-primary' : 'bg-secondary'}`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {phase === 'CAPTAIN' && (
                <div className="space-y-8">
                  <h3 className="text-lg font-display text-white italic tracking-widest uppercase">02. Captain's Intel</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      { label: 'Full Name', key: 'name' },
                      { label: 'Register Number', key: 'regNo' },
                      { label: 'Phone Number', key: 'phone', type: 'tel' },
                      { label: 'Email ID', key: 'email', type: 'email' },
                      { label: 'Department', key: 'department' }
                    ].map((field) => (
                      <div key={field.key} className="space-y-1 relative group">
                        <label className="text-[9px] font-display text-primary/40 uppercase tracking-widest pl-1">{field.label}</label>
                        <input
                          required
                          value={(leader as any)[field.key]}
                          onChange={(e) => setLeader({ ...leader, [field.key]: e.target.value })}
                          className="w-full bg-transparent border-b border-white/10 text-white p-2 focus:border-primary outline-none font-body transition-all"
                        />
                      </div>
                    ))}
                    <div className="space-y-1 relative group">
                      <label className="text-[9px] font-display text-primary/40 uppercase tracking-widest pl-1">Year of Study</label>
                      <select
                        value={leader.year}
                        onChange={(e) => setLeader({ ...leader, year: e.target.value })}
                        className="w-full bg-white/5 border-b border-white/10 text-white p-2 rounded-t-lg focus:border-primary outline-none font-body appearance-none cursor-pointer"
                      >
                        <option className="bg-gray-900 border-none">Select year</option>
                        <option className="bg-gray-900 border-none">1st Year</option>
                        <option className="bg-gray-900 border-none">2nd Year</option>
                        <option className="bg-gray-900 border-none">3rd Year</option>
                        <option className="bg-gray-900 border-none">4th Year</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {phase === 'ADVISOR' && (
                <div className="space-y-8 py-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-display text-white italic tracking-widest uppercase">03. Faculty Clearance</h3>
                    <p className="text-[10px] text-primary/60 font-display tracking-[0.2em]">MANDATORY FOR MISSION APPROVAL (OD)</p>
                  </div>
                  <div className="space-y-8 max-w-md mx-auto">
                    <div className="relative group">
                      <input
                        required
                        value={advisor.name}
                        onChange={(e) => setAdvisor({ ...advisor, name: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/10 text-white p-4 focus:border-primary outline-none font-display uppercase tracking-widest text-xl transition-all text-center"
                        placeholder="ADVISOR NAME"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        required
                        type="email"
                        value={advisor.email}
                        onChange={(e) => setAdvisor({ ...advisor, email: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/10 text-white p-4 focus:border-primary outline-none font-display tracking-widest text-lg transition-all text-center"
                        placeholder="FACULTY EMAIL"
                      />
                    </div>
                  </div>
                </div>
              )}

              {phase === 'SUPPORT' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-3xl">
                    <h3 className="text-sm font-display text-white italic uppercase tracking-widest">04. Crew Deployment</h3>
                    <button
                      type="button"
                      onClick={addMember}
                      disabled={members.length >= 3}
                      className="px-4 py-2 bg-primary/20 text-primary rounded-full text-[10px] font-display hover:bg-primary/40 transition-all disabled:opacity-20"
                    >
                      ADD UNIT +
                    </button>
                  </div>
                  <div className="space-y-6">
                    {members.map((member, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] space-y-6 group relative"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-display text-primary tracking-widest border-l-2 border-primary pl-3 uppercase">Unit 0{i + 2} Details</span>
                          {members.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMember(i)}
                              className="text-white/20 hover:text-secondary group transition-colors"
                            >
                              <span className="material-icons text-lg">cancel</span>
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input placeholder="NAME" value={member.name} onChange={(e) => handleMemberChange(i, 'name', e.target.value)} className="bg-transparent border-b border-white/5 text-sm p-2 outline-none focus:border-primary transition-all font-body text-white" />
                          <input placeholder="REG NUMBER" value={member.regNo} onChange={(e) => handleMemberChange(i, 'regNo', e.target.value)} className="bg-transparent border-b border-white/5 text-sm p-2 outline-none focus:border-primary transition-all font-body text-white" />
                          <input placeholder="PHONE" value={member.phone} onChange={(e) => handleMemberChange(i, 'phone', e.target.value)} className="bg-transparent border-b border-white/5 text-sm p-2 outline-none focus:border-primary transition-all font-body text-white" />
                          <input placeholder="DEPT" value={member.department} onChange={(e) => handleMemberChange(i, 'department', e.target.value)} className="bg-transparent border-b border-white/5 text-sm p-2 outline-none focus:border-primary transition-all font-body text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {phase === 'VERIFY' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-display font-black text-white italic tracking-tighter uppercase">MISSION DATA VERIFICATION</h3>
                    <p className="text-[9px] text-primary/40 font-display tracking-[0.3em] mt-1 uppercase pl-1">Confirm squad parameters before uplink</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[3rem] text-center space-y-2">
                      <p className="text-[8px] font-display text-primary/40 tracking-[0.5em]">DESIGNATION</p>
                      <p className="text-3xl font-display font-black text-white italic tracking-widest">{teamName}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] space-y-2">
                        <p className="text-[8px] font-display text-primary/40 tracking-[0.3em] uppercase">Captain</p>
                        <p className="text-lg font-bold text-white uppercase">{leader.name}</p>
                        <p className="text-xs text-gray-500 font-body">{leader.regNo} // {leader.year}</p>
                      </div>
                      <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] space-y-2">
                        <p className="text-[8px] font-display text-primary/40 tracking-[0.3em] uppercase">Advisor</p>
                        <p className="text-lg font-bold text-white uppercase">{advisor.name}</p>
                        <p className="text-xs text-gray-500 font-body">{advisor.email}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] flex flex-wrap gap-6 justify-center">
                      {members.map((m, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                          <p className="text-[10px] font-display text-white italic tracking-wider uppercase opacity-80">{m.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fluid Navigation Footer */}
        <div className="p-8 pt-0 flex gap-4">
          {currentPhaseIndex > 0 && (
            <button
              onClick={prevPhase}
              className="w-16 h-16 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center"
            >
              <span className="material-icons">arrow_back</span>
            </button>
          )}

          {currentPhaseIndex < phases.length - 1 ? (
            <button
              onClick={nextPhase}
              disabled={!isPhaseValid()}
              className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-display text-xs font-bold tracking-[0.4em] rounded-full transition-all uppercase disabled:opacity-20"
            >
              PROCEED
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !isPhaseValid()}
              className="flex-1 py-4 bg-primary text-background-dark font-display font-black text-xs tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] rounded-full transition-all shadow-[0_20px_40px_rgba(0,229,255,0.2)] uppercase disabled:opacity-20"
            >
              {loading ? 'INITIATING UPLINK...' : 'INITIATE UPLINK'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationModal;
