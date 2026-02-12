
import React from 'react';

interface BottomNavProps {
  activeView: string;
  onViewChange: (view: any) => void;
  onCartClick: () => void;
  cartCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange, onCartClick, cartCount }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around z-[50] md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <button 
        onClick={() => onViewChange('HOME')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'HOME' ? 'text-amber-500' : 'text-slate-400'}`}
      >
        <i className="fa-solid fa-house text-lg"></i>
        <span className="text-[10px] font-bold">Home</span>
      </button>
      
      <button 
        onClick={() => onViewChange('HOME')}
        className={`flex flex-col items-center gap-1 transition-colors text-slate-400`}
      >
        <i className="fa-solid fa-layer-group text-lg"></i>
        <span className="text-[10px] font-bold">Category</span>
      </button>

      <button 
        onClick={onCartClick}
        className="relative flex flex-col items-center gap-1 text-slate-400"
      >
        <div className="relative">
          <i className="fa-solid fa-cart-shopping text-lg"></i>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold">Cart</span>
      </button>

      <button 
        onClick={() => onViewChange('PROFILE')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'PROFILE' || activeView === 'LOGIN' ? 'text-amber-500' : 'text-slate-400'}`}
      >
        <i className="fa-solid fa-user text-lg"></i>
        <span className="text-[10px] font-bold">Profile</span>
      </button>
    </div>
  );
};

export default BottomNav;
