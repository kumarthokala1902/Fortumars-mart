
import React, { useState } from 'react';
import { User } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
  onAdminClick?: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onSearch, 
  cartCount, 
  onCartClick, 
  onHomeClick, 
  currentUser, 
  onLoginClick,
  onProfileClick,
  onLogout,
  onAdminClick,
  isDarkMode,
  toggleDarkMode
}) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <nav className="bg-[#131921] text-white py-2 md:py-3 px-4 sticky top-0 z-50 shadow-lg transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-2 md:gap-8">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer hover:scale-105 transition-transform p-1 rounded"
          onClick={onHomeClick}
        >
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center font-poppins">
            Fortumas<span className="text-[#febd69]">Mart</span>
          </span>
        </div>

        {/* Search Bar - Enhanced Responsiveness */}
        <form 
          className="flex-grow flex h-10 md:h-12 rounded-xl overflow-hidden shadow-inner group transition-all duration-300 border border-transparent focus-within:border-amber-500/50" 
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            className="flex-grow px-3 md:px-5 text-black focus:outline-none text-sm font-medium bg-slate-50 group-focus-within:bg-white transition-colors"
            placeholder="Search premium..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-[#febd69] hover:bg-[#f3a847] text-[#131921] px-3 md:px-6 flex items-center justify-center transition-all active:scale-95 border-l border-slate-200"
          >
            <i className="fa-solid fa-magnifying-glass text-sm md:text-base"></i>
          </button>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 h-9 w-9 md:h-12 md:w-12 rounded-full hover:bg-slate-700/50 transition-all flex items-center justify-center text-lg md:text-xl text-amber-400 active:scale-90"
            title="Toggle Dark Mode"
          >
            <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          {/* User Account */}
          <div className="hidden md:flex items-center gap-4">
            <div 
              onClick={currentUser ? undefined : onLoginClick}
              className="group relative flex flex-col text-xs cursor-pointer hover:bg-slate-700/50 p-2 rounded-lg transition-colors min-w-[110px]"
            >
              <div className="flex items-center gap-2">
                {currentUser && (
                  <img src={currentUser.avatar} className="w-6 h-6 rounded-full border border-amber-500/30" alt="" />
                )}
                <div className="flex flex-col">
                  <span className="text-gray-400">Hello, {currentUser ? currentUser.name : 'Sign in'}</span>
                  <span className="font-bold flex items-center text-sm">
                    Account <i className="fa-solid fa-caret-down ml-1 text-[10px]"></i>
                  </span>
                </div>
              </div>
              
              {currentUser && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-5 rounded-2xl shadow-2xl hidden group-hover:block z-50 animate-fade-in border border-slate-100 dark:border-slate-700">
                  <div className="mb-4 font-bold border-b dark:border-slate-700 pb-3 flex items-center gap-3">
                    <img src={currentUser.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <div className="flex flex-col">
                      <span className="truncate w-32">{currentUser.name}</span>
                      <span className="text-[9px] text-amber-500 uppercase tracking-widest">{currentUser.role}</span>
                    </div>
                  </div>
                  <button 
                    onClick={onProfileClick}
                    className="w-full text-left text-sm py-2 hover:text-amber-600 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <i className="fa-solid fa-user-circle"></i> View My Profile
                  </button>
                  {currentUser.role === 'admin' && (
                    <button 
                      onClick={onAdminClick}
                      className="w-full text-left text-sm py-2 hover:text-amber-600 font-semibold flex items-center gap-2 transition-colors"
                    >
                      <i className="fa-solid fa-gauge-high"></i> Admin Dashboard
                    </button>
                  )}
                  <button className="w-full text-left text-sm py-2 hover:text-amber-600 flex items-center gap-2 transition-colors">
                    <i className="fa-solid fa-box-open"></i> Your Orders
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left text-sm py-2 hover:text-red-500 mt-3 border-t dark:border-slate-700 pt-3 flex items-center gap-2 transition-colors"
                  >
                    <i className="fa-solid fa-power-off"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cart Desktop / Mobile */}
          <div 
            className="relative flex items-center cursor-pointer hover:bg-slate-700/50 p-2 h-9 w-9 md:h-auto md:w-auto rounded-lg transition-colors group"
            onClick={onCartClick}
          >
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-lg md:text-2xl group-hover:scale-110 transition-transform"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[8px] md:text-[10px] ring-2 ring-[#131921] animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-bold hidden md:block ml-2 text-sm">Cart</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
