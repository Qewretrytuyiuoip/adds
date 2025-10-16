
import React from 'react';

interface HeaderProps {
  onAddItem: () => void;
  onToggleFavorites: (show: boolean) => void;
  showFavorites: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAddItem, onToggleFavorites, showFavorites }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">الإعلانات المبوبة</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onToggleFavorites(!showFavorites)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              showFavorites 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showFavorites ? 'عرض الكل' : 'المفضلة'}
          </button>
          <button 
            onClick={onAddItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            أضف عنصر جديد
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
