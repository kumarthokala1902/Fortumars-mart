
import React from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart, onViewDetails }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 flex flex-col md:flex-row border border-slate-100 dark:border-slate-700">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all shadow-lg active:scale-90"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 bg-slate-50 dark:bg-slate-900 p-8 flex items-center justify-center">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-amber-400 text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">{product.category}</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white font-poppins mb-4 line-clamp-2">{product.name}</h2>
          
          <div className="flex items-center mb-6">
            <div className="flex text-amber-400 text-xs gap-1">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'}`}></i>
              ))}
            </div>
            <span className="text-xs text-slate-400 ml-4 font-bold">{product.reviewsCount.toLocaleString()} Reviews</span>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-4 italic">
            {product.description}
          </p>

          <div className="flex items-baseline gap-2 mb-10">
            <span className="text-4xl font-black text-slate-900 dark:text-white">${product.price.toLocaleString()}</span>
            <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full uppercase">In Stock</span>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="w-full bg-slate-900 dark:bg-slate-700 text-white py-4 rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-cart-plus"></i> Add to Bag
            </button>
            <button 
              onClick={() => { onViewDetails(product); onClose(); }}
              className="w-full text-center text-[10px] font-black text-slate-400 hover:text-amber-500 uppercase tracking-[0.2em] transition-colors"
            >
              View Full Product Narrative
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
