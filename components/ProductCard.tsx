
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-50 dark:border-slate-700/50 flex flex-col h-full group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all duration-300 transform hover:-translate-y-1">
      <div 
        className="relative mb-4 cursor-pointer overflow-hidden rounded-2xl aspect-square bg-slate-50 dark:bg-slate-900"
        onClick={() => onProductClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-900 dark:text-white text-[9px] px-3 py-1 font-extrabold rounded-full shadow-sm border border-white/20 uppercase tracking-tighter">
            {product.badge}
          </span>
        )}
      </div>
      
      <div className="flex-grow flex flex-col">
        <h3 
          className="text-sm font-bold mb-2 line-clamp-2 hover:text-amber-500 cursor-pointer dark:text-slate-100 font-poppins transition-colors"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400 text-[10px] gap-0.5">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'}`}></i>
            ))}
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-2 font-medium">
            ({product.reviewsCount.toLocaleString()})
          </span>
        </div>

        <div className="mb-4 flex items-baseline gap-1">
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">$</span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{Math.floor(product.price)}</span>
          <span className="text-sm font-bold text-slate-400">{(product.price % 1).toFixed(2).substring(2)}</span>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="mt-auto w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white py-3 rounded-2xl text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
