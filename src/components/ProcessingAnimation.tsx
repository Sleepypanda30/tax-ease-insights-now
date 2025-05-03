
import React from "react";

interface ProcessingAnimationProps {
  status: string;
  progress: number;
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ status, progress }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Document with scanning animation */}
      <div className="relative w-40 h-52 bg-white shadow-lg rounded-md overflow-hidden">
        {/* Document content lines */}
        <div className="p-4 space-y-2">
          <div className="h-2 bg-taxgray-200 rounded w-3/4"></div>
          <div className="h-2 bg-taxgray-200 rounded w-5/6"></div>
          <div className="h-2 bg-taxgray-200 rounded w-2/3"></div>
          <div className="h-2 bg-taxgray-200 rounded w-4/5"></div>
          <div className="h-2 bg-taxgray-200 rounded w-3/4"></div>
          <div className="h-2 bg-taxgray-200 rounded w-5/6"></div>
          <div className="h-2 bg-taxgray-200 rounded w-2/3"></div>
          <div className="h-2 bg-taxgray-200 rounded w-4/5"></div>
        </div>
        
        {/* Scanning animation */}
        <div className="absolute inset-x-0 top-0 h-1 bg-taxblue opacity-70" style={{ 
          animation: 'scanMove 2s ease-in-out infinite',
          boxShadow: '0 0 8px 2px rgba(0, 120, 215, 0.5)'
        }}></div>
        
        {/* Extraction points */}
        <div className="absolute top-8 left-6 w-20 h-2 bg-taxgreen opacity-0" style={{ 
          animation: 'highlight 4s ease-in-out infinite',
          animationDelay: '0.5s'
        }}></div>
        <div className="absolute top-16 left-10 w-16 h-2 bg-taxgreen opacity-0" style={{ 
          animation: 'highlight 4s ease-in-out infinite',
          animationDelay: '1.5s'
        }}></div>
        <div className="absolute top-24 left-8 w-12 h-2 bg-taxgreen opacity-0" style={{ 
          animation: 'highlight 4s ease-in-out infinite',
          animationDelay: '2.5s'
        }}></div>
      </div>
      
      {/* Status and progress */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-taxgray-700">{status}</span>
          <span className="text-sm font-medium text-taxgray-700">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-taxgray-200 rounded-full h-2">
          <div 
            className="bg-taxblue h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Extraction details */}
      <div className="space-y-3 w-full max-w-xs">
        <div className="flex items-center text-sm">
          <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center ${progress > 25 ? 'bg-taxgreen' : 'bg-taxgray-300'} mr-3`}>
            {progress > 25 && <span className="text-white text-xs">✓</span>}
          </div>
          <span className={progress > 25 ? 'text-taxgray-700' : 'text-taxgray-500'}>Extracting document data</span>
        </div>
        <div className="flex items-center text-sm">
          <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center ${progress > 50 ? 'bg-taxgreen' : 'bg-taxgray-300'} mr-3`}>
            {progress > 50 && <span className="text-white text-xs">✓</span>}
          </div>
          <span className={progress > 50 ? 'text-taxgray-700' : 'text-taxgray-500'}>Analyzing tax information</span>
        </div>
        <div className="flex items-center text-sm">
          <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center ${progress > 75 ? 'bg-taxgreen' : 'bg-taxgray-300'} mr-3`}>
            {progress > 75 && <span className="text-white text-xs">✓</span>}
          </div>
          <span className={progress > 75 ? 'text-taxgray-700' : 'text-taxgray-500'}>Generating personalized advice</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scanMove {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(200px); }
        }
        @keyframes highlight {
          0%, 100% { opacity: 0; }
          25%, 75% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ProcessingAnimation;
