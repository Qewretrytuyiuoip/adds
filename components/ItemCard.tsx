
import React from 'react';
import type { Item } from '../types';
import Comments from './Comments';

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
}

const HeartIcon: React.FC<{ isFavorite: boolean }> = ({ isFavorite }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);


const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <button onClick={() => onToggleFavorite(item.id, !item.isFavorite)} className="p-1">
                <HeartIcon isFavorite={item.isFavorite} />
            </button>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
        <p className="text-2xl font-bold text-blue-600 mb-4">{item.price.toLocaleString()} ريال</p>
        
        <Comments itemId={item.id} />
        
        <div className="mt-auto pt-4 flex gap-2">
          <button onClick={() => onEdit(item)} className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors">
            تعديل
          </button>
          <button onClick={() => onDelete(item.id)} className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
