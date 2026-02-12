
import React from 'react';

export const SkeletonProduct = () => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 animate-fade-in">
    <div className="aspect-square w-full shimmer rounded-xl mb-4"></div>
    <div className="h-4 w-3/4 shimmer rounded mb-2"></div>
    <div className="h-4 w-1/2 shimmer rounded mb-4"></div>
    <div className="h-6 w-1/4 shimmer rounded mb-4"></div>
    <div className="h-10 w-full shimmer rounded-full"></div>
  </div>
);

export const SkeletonDetail = () => (
  <div className="max-w-screen-xl mx-auto p-4 md:p-8 animate-fade-in">
    <div className="flex flex-col md:flex-row gap-12">
      <div className="md:w-1/2 aspect-square shimmer rounded-2xl"></div>
      <div className="md:w-1/2 space-y-6">
        <div className="h-10 w-3/4 shimmer rounded"></div>
        <div className="h-6 w-1/4 shimmer rounded"></div>
        <hr className="border-slate-100 dark:border-slate-700" />
        <div className="h-8 w-1/3 shimmer rounded"></div>
        <div className="space-y-2">
          <div className="h-4 w-full shimmer rounded"></div>
          <div className="h-4 w-full shimmer rounded"></div>
          <div className="h-4 w-2/3 shimmer rounded"></div>
        </div>
        <div className="h-12 w-full shimmer rounded-full"></div>
      </div>
    </div>
  </div>
);
