
import React, { useState } from 'react';
import { User } from '../types';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation: Any "admin@fortumars.com" is an admin
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || email.split('@')[0],
      role,
      bio: bio || (isRegistering ? "Just started my premium journey." : "A loyal Fortumars customer."),
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      // Updated: Set avatar to a cat and location to India Coimbatore
      avatar: `https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=256`,
      location: 'Coimbatore, India 641110'
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-50 dark:border-slate-700 animate-fade-in">
      <h2 className="text-3xl font-black mb-8 text-center text-slate-900 dark:text-white font-poppins">
        {isRegistering ? 'Join the Circle' : 'Sign-In'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {isRegistering && (
          <>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Display Name</label>
              <input
                type="text"
                required
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                placeholder="How should we call you?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Short Bio</label>
              <textarea
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                placeholder="Tell us about your style..."
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Secure Password</label>
          <input
            type="password"
            required
            className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-black py-4 rounded-2xl shadow-xl shadow-amber-400/20 transition-all active:scale-95"
        >
          {isRegistering ? 'Create Account' : 'Continue Shopping'}
        </button>
      </form>
      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center font-bold">
          {isRegistering ? 'Already have an account?' : 'New to FortumarsMart?'}
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-amber-500 hover:underline ml-2"
          >
            {isRegistering ? 'Sign in here' : 'Join the Inner Circle'}
          </button>
        </p>
        <button 
          onClick={onCancel}
          className="w-full text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white font-black uppercase tracking-widest transition-colors"
        >
          Cancel and return
        </button>
      </div>
      <p className="mt-6 text-[10px] text-slate-300 dark:text-slate-500 text-center font-bold italic leading-relaxed">
        Tip: Login with "admin@fortumars.com" to access management controls.
      </p>
    </div>
  );
};

export default LoginForm;
