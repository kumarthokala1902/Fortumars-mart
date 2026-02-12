import React, { useState } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { generateProductImage } from '../services/geminiService';

interface AdminDashboardProps {
  // Fix: Added products to AdminDashboardProps to allow displaying store overview statistics
  products: Product[];
  onAddProduct: (product: Product) => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onAddProduct, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);

  const handleGenerateAIImage = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    setAiError('');
    try {
      const imageUrl = await generateProductImage(aiPrompt);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      setAiError('Failed to generate image. Please check your API key or try a different prompt.');
    } finally {
      setIsGenerating(false);
    }
  };

  const useAIImage = () => {
    if (generatedImageUrl) {
      setFormData(prev => ({ ...prev, image: generatedImageUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunching(true);
    try {
      const newProduct: Product = {
        id: 'p' + Date.now(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        rating: 5.0,
        reviewsCount: 0,
        image: formData.image,
        badge: 'New Arrival'
      };
      await onAddProduct(newProduct);
      setFormData({ name: '', description: '', price: '', category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' });
      setGeneratedImageUrl('');
      setAiPrompt('');
      alert('Product launched to the cloud successfully!');
    } catch (error) {
      alert('Failed to launch product. Check console for details.');
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Central</h1>
          <p className="text-gray-500 text-sm">Create and manage your luxury product catalog</p>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
          <i className="fa-solid fa-arrow-left text-sm"></i> Exit Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 h-full">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
              <i className="fa-solid fa-plus-circle text-amber-500"></i> Product Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">Product Name</label>
                <input
                  required
                  placeholder="e.g. Fortumars Vision Pro Max"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none transition-all"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">Department</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none transition-all appearance-none bg-white dark:bg-slate-900"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">Detailed Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the unique features and value of this product..."
                  className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none transition-all"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">Product Image (URL or Generated)</label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none transition-all"
                  placeholder="Upload link or use AI studio on the right"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={isLaunching}
                className="w-full bg-[#131921] dark:bg-amber-500 dark:text-slate-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-amber-400 transition-all shadow-lg active:scale-[0.98] mt-4 disabled:opacity-50"
              >
                {isLaunching ? 'Launching to Cloud...' : 'Launch Product'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles text-amber-400"></i> AI Studio
              </h2>
              <p className="text-indigo-200 text-xs mb-6">Describe your product to generate professional photography.</p>
              
              <div className="space-y-4">
                <textarea
                  placeholder="e.g. A pair of luxury leather sneakers on a floating pedestal, soft sunrise lighting, bokeh background..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-white placeholder:text-indigo-300"
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                
                <button 
                  onClick={handleGenerateAIImage}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    isGenerating ? 'bg-indigo-400/50 cursor-not-allowed' : 'bg-amber-400 hover:bg-amber-300 text-indigo-950 shadow-lg shadow-amber-400/20'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                      Studio is Processing...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-bolt"></i>
                      Generate AI Photo
                    </>
                  )}
                </button>

                {aiError && <p className="text-red-300 text-[10px] italic">{aiError}</p>}

                <div className="mt-6 aspect-square bg-black/30 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center relative group">
                  {generatedImageUrl ? (
                    <>
                      <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                        <p className="text-xs font-medium">Generation Complete</p>
                        <button 
                          onClick={useAIImage}
                          className="bg-white text-indigo-950 px-4 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-transform"
                        >
                          Use this Photo
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <i className="fa-solid fa-image text-white/10 text-6xl mb-4"></i>
                      <p className="text-indigo-300 text-xs">Generated images will appear here</p>
                    </div>
                  )}
                  
                  {isGenerating && (
                    <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-sm font-medium animate-pulse">Consulting AI Artist...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-400 opacity-10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-amber-50 dark:bg-slate-800 p-6 rounded-2xl border border-amber-200 dark:border-slate-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <i className="fa-solid fa-chart-line text-amber-600"></i> Store Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold">Inventory</p>
                  {/* Fix: Using products.length from props */}
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{products.length} SKUs</p>
                </div>
                <i className="fa-solid fa-box text-amber-200 text-2xl"></i>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold">Revenue</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">$18,430</p>
                </div>
                <i className="fa-solid fa-sack-dollar text-green-200 text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;