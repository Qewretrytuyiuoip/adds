
import React, { useState, useEffect, useCallback } from 'react';
import type { Item } from './types';
import Header from './components/Header';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import Modal from './components/Modal';
import Spinner from './components/Spinner';
import * as api from './services/apiService';

const App: React.FC = () => {
  // حالة لتخزين قائمة العناصر
  const [items, setItems] = useState<Item[]>([]);
  // حالة لتتبع حالة التحميل
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // حالة لتخزين الأخطاء
  const [error, setError] = useState<string | null>(null);
  // حالة للتحكم في عرض نافذة الإضافة/التعديل
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  // حالة لتخزين العنصر الذي يتم تعديله حاليًا
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  // حالة لعرض المفضلة فقط
  const [showFavorites, setShowFavorites] = useState<boolean>(false);


  // دالة لجلب البيانات من الـ API المحاكى
  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedItems = await api.getItems();
      setItems(fetchedItems);
    } catch (err) {
      setError("فشل في جلب البيانات.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // جلب البيانات عند تحميل التطبيق لأول مرة
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // دالة لفتح نافذة إضافة عنصر جديد
  const handleAddItem = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  // دالة لفتح نافذة تعديل عنصر
  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  // دالة لحذف عنصر
  const handleDeleteItem = async (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      await api.deleteItem(id);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  // دالة لحفظ عنصر (سواء كان جديدًا أو معدلاً)
  const handleSaveItem = async (itemData: Omit<Item, 'id' | 'isFavorite'> | Item) => {
    if ('id' in itemData) { // تعديل عنصر موجود
      const updatedItem = await api.updateItem(itemData.id, itemData);
      setItems(prevItems => prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    } else { // إضافة عنصر جديد
      const newItem = await api.addItem(itemData);
      setItems(prevItems => [...prevItems, newItem]);
    }
    setIsFormOpen(false);
  };

  // دالة لتبديل حالة المفضلة
  const handleToggleFavorite = async (id: number, isFavorite: boolean) => {
      const updatedItem = await api.updateItem(id, { isFavorite });
      setItems(prevItems => prevItems.map(item => (item.id === id ? updatedItem : item)));
  };

  // فلترة العناصر لعرض المفضلة فقط إذا تم تفعيل الخيار
  const filteredItems = showFavorites ? items.filter(item => item.isFavorite) : items;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        onAddItem={handleAddItem} 
        onToggleFavorites={setShowFavorites}
        showFavorites={showFavorites}
      />
      <main className="container mx-auto">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : (
          <ItemList 
            items={filteredItems} 
            onEdit={handleEditItem} 
            onDelete={handleDeleteItem}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title={editingItem ? "تعديل العنصر" : "إضافة عنصر جديد"}
      >
        <ItemForm 
          onSave={handleSaveItem} 
          onClose={() => setIsFormOpen(false)}
          itemToEdit={editingItem}
        />
      </Modal>
    </div>
  );
};

export default App;
