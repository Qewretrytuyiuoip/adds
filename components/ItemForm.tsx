
import React, { useState, useEffect } from 'react';
import type { Item } from '../types';

interface ItemFormProps {
  onSave: (item: Omit<Item, 'id' | 'isFavorite'> | Item) => void;
  onClose: () => void;
  itemToEdit?: Item | null;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSave, onClose, itemToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // تعبئة النموذج ببيانات العنصر عند التعديل
  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setPrice(itemToEdit.price.toString());
      setImageUrl(itemToEdit.imageUrl);
    } else {
      // إعادة تعيين النموذج عند الإضافة
      setTitle('');
      setDescription('');
      setPrice('');
      setImageUrl(`https://picsum.photos/seed/${Date.now()}/400/300`);
    }
  }, [itemToEdit]);

  // دالة التعامل مع إرسال النموذج
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = {
      title,
      description,
      price: parseFloat(price),
      imageUrl,
    };

    if (itemToEdit) {
        onSave({ ...itemToEdit, ...itemData });
    } else {
        onSave(itemData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">العنوان</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
       <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">رابط الصورة</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
          إلغاء
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {itemToEdit ? 'حفظ التعديلات' : 'إضافة عنصر'}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
