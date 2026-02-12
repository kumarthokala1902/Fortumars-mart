
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
  onUpdateProfile: (updatedUser: User) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, onBack, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedBio, setEditedBio] = useState(user.bio || '');
  const [editedLocation, setEditedLocation] = useState(user.location || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate a network delay for a premium feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedUser: User = {
      ...user,
      name: editedName,
      bio: editedBio,
      location: editedLocation
    };
    
    onUpdateProfile(updatedUser);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setEditedBio(user.bio || '');
    setEditedLocation(user.location || '');
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 page-transition">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-amber-500 font-bold transition-colors group"
        >
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Shopping
        </button>
        <button 
          onClick={onLogout}
          className="text-rose-500 hover:text-rose-600 font-bold text-sm uppercase tracking-widest"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-700 overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="absolute -bottom-16 left-10 p-2 bg-white dark:bg-slate-800 rounded-[2.5rem]">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=fbbf24&color=131921&size=256`} 
              alt={user.name}
              className="w-32 h-32 rounded-[2rem] object-cover shadow-xl border-4 border-white dark:border-slate-800"
            />
          </div>
          <div className="absolute bottom-4 right-10">
            <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
              {user.role === 'admin' ? 'System Administrator' : 'Elite Member'}
            </span>
          </div>
        </div>

        <div className="pt-20 px-10 pb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex-grow max-w-lg">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Display Name</label>
                    <input 
                      type="text"
                      className="text-2xl font-black text-slate-900 dark:text-white font-poppins bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white font-poppins mb-2">{user.name}</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                    <i className="fa-solid fa-envelope text-amber-500"></i> {user.email}
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-3 shrink-0">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleCancel}
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-2xl font-bold text-sm transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-3 bg-amber-500 text-slate-900 rounded-2xl font-bold text-sm shadow-xl shadow-amber-500/10 transition-all active:scale-95 flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <i className="fa-solid fa-circle-notch animate-spin"></i>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-2xl font-bold text-sm transition-all active:scale-95"
                  >
                    Edit Profile
                  </button>
                  <button className="px-6 py-3 bg-slate-900 dark:bg-amber-500 dark:text-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-900/10 transition-all active:scale-95">
                    Membership Perks
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Info */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                  <div className="w-1 h-3 bg-amber-500 rounded-full"></div>
                  About You
                </h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                  {isEditing ? (
                    <textarea 
                      className="w-full bg-transparent text-slate-600 dark:text-slate-300 leading-relaxed font-medium focus:outline-none min-h-[100px]"
                      placeholder="Express your lifestyle here..."
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                    />
                  ) : (
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {user.bio || "No bio available yet. Express your lifestyle here!"}
                    </p>
                  )}
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Current Location</p>
                  {isEditing ? (
                    <input 
                      type="text"
                      className="font-bold text-slate-900 dark:text-white bg-transparent border-b border-amber-500/30 w-full focus:outline-none focus:border-amber-500 transition-colors"
                      value={editedLocation}
                      onChange={(e) => setEditedLocation(e.target.value)}
                    />
                  ) : (
                    <p className="font-bold text-slate-900 dark:text-white">{user.location || "San Francisco, CA"}</p>
                  )}
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Joined Fortumars</p>
                  <p className="font-bold text-slate-900 dark:text-white">{user.joinDate || "January 2024"}</p>
                </div>
              </div>

              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                  <div className="w-1 h-3 bg-amber-500 rounded-full"></div>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-2xl transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-pointer group">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-box-open"></i>
                      </div>
                      <div>
                        <p className="font-bold text-sm dark:text-white">Order #FMT-992{i} Delivered</p>
                        <p className="text-xs text-slate-400">Arrived on Thursday, Oct 24th</p>
                      </div>
                      <i className="fa-solid fa-chevron-right ml-auto text-slate-300 text-[10px]"></i>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Stats/Shortcuts */}
            <div className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-500/5 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-500/10">
                <h4 className="font-black text-amber-600 mb-6 font-poppins">Wallet Status</h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600/60 mb-1">Store Credit</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">$1,240.00</p>
                  </div>
                  <button className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-2xl text-sm transition-all active:scale-95 shadow-lg shadow-amber-400/20">
                    Add Funds
                  </button>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                <h4 className="font-black text-slate-900 dark:text-white mb-6 font-poppins">Account Safety</h4>
                <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <li className="flex items-center justify-between hover:text-amber-500 cursor-pointer transition-colors">
                    2FA Status <span className="text-green-500 text-[10px] bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">ACTIVE</span>
                  </li>
                  <li className="flex items-center justify-between hover:text-amber-500 cursor-pointer transition-colors">
                    Change Password <i className="fa-solid fa-chevron-right text-[8px]"></i>
                  </li>
                  <li className="flex items-center justify-between hover:text-amber-500 cursor-pointer transition-colors">
                    Data & Privacy <i className="fa-solid fa-chevron-right text-[8px]"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
