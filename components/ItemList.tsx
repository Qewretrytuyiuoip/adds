
import React from 'react';
import type { Item } from '../types';
import ItemCard from './ItemCard';

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete, onToggleFavorite }) => {
  if (items.length === 0) {
    return <p className="text-center text-gray-500 mt-8">لا توجد عناصر لعرضها.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6">
      {items.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onEdit={onEdit} 
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ItemList;
