import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  items, 
  isOpen, 
  onClose, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col transition-transform duration-500 translate-x-0">
          <div className="flex-1 overflow-y-auto py-8 px-6 sm:px-10">
            <div className="flex items-start justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-poppins">Your Bag</h2>
              <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-50 dark:bg-slate-800 p-2 rounded-full"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="mt-8">
              {items.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-700/50 animate-fade-in">
                  <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl animate-float border border-slate-50 dark:border-slate-700">
                    <i className="fa-solid fa-shopping-bag text-4xl text-amber-500/30"></i>
                  </div>
                  <div className="space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <p className="text-slate-400 dark:text-slate-500 font-bold text-lg">Your bag is looking light.</p>
                    <p className="text-slate-400 dark:text-slate-600 text-sm max-w-[200px] mx-auto leading-relaxed">Explore our premium collections to fill it with style.</p>
                    <button 
                      onClick={onClose} 
                      className="mt-6 inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-[0.2em] hover:text-amber-600 transition-colors group"
                    >
                      Start Exploring
                      <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-6 animate-fade-in group">
                      <div className="flex-shrink-0 w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
                        <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white mb-1">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4 font-black text-amber-500">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-4">{item.category}</p>
                        
                        <div className="flex-1 flex items-end justify-between">
                          <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-100 dark:border-slate-700">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            >
                              <i className="fa-solid fa-minus text-[10px]"></i>
                            </button>
                            <span className="w-8 text-center text-xs font-black dark:text-white">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            >
                              <i className="fa-solid fa-plus text-[10px]"></i>
                            </button>
                          </div>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-[10px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 py-10 px-6 sm:px-10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-t-[3rem]">
            <div className="flex justify-between text-lg font-black text-slate-900 dark:text-white mb-8 font-poppins">
              <p>Total Value</p>
              <p>${subtotal.toLocaleString()}</p>
            </div>
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full py-5 rounded-[1.5rem] shadow-xl text-base font-black text-slate-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:grayscale transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-credit-card"></i> Proceed to Checkout
            </button>
            <div className="mt-6 flex justify-center text-xs text-center text-slate-400 font-bold uppercase tracking-widest">
              <p>
                Secure 256-bit Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;