
import type { Item, Comment } from '../types';
import { mockItems, mockComments } from '../data/mockData';

// هذا الملف يحاكي واجهة برمجة تطبيقات (API) حقيقية
// في تطبيق حقيقي، ستقوم هذه الدوال بإجراء استدعاءات شبكة باستخدام fetch

// إعدادات نقاط الاتصال بالـ API (للاستخدام المستقبلي)
export const API_BASE_URL = "https://your-api-endpoint.com";
export const ENDPOINTS = {
  getItems: "/items",
  addItem: "/items",
  updateItem: (id: number) => `/items/${id}`,
  deleteItem: (id: number) => `/items/${id}`,
  getComments: (itemId: number) => `/items/${itemId}/comments`,
  addComment: (itemId: number) => `/items/${itemId}/comments`,
  favorites: "/favorites"
};

const SIMULATED_DELAY = 500; // تأخير محاكاة الشبكة بالمللي ثانية

// دالة لجلب كل العناصر
export const getItems = async (): Promise<Item[]> => {
  console.log(`محاكاة جلب من: ${API_BASE_URL}${ENDPOINTS.getItems}`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockItems]);
    }, SIMULATED_DELAY);
  });
};

// دالة لإضافة عنصر جديد
export const addItem = async (itemData: Omit<Item, 'id' | 'isFavorite'>): Promise<Item> => {
  console.log(`محاكاة إضافة إلى: ${API_BASE_URL}${ENDPOINTS.addItem}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const newItem: Item = {
        ...itemData,
        id: Date.now(), // استخدام timestamp كمعرف فريد
        isFavorite: false,
      };
      mockItems.push(newItem);
      resolve(newItem);
    }, SIMULATED_DELAY);
  });
};

// دالة لتحديث عنصر موجود
export const updateItem = async (id: number, itemData: Partial<Item>): Promise<Item> => {
  console.log(`محاكاة تحديث في: ${API_BASE_URL}${ENDPOINTS.updateItem(id)}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const itemIndex = mockItems.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        mockItems[itemIndex] = { ...mockItems[itemIndex], ...itemData };
        resolve(mockItems[itemIndex]);
      } else {
        reject(new Error("العنصر غير موجود"));
      }
    }, SIMULATED_DELAY);
  });
};

// دالة لحذف عنصر
export const deleteItem = async (id: number): Promise<{ success: boolean }> => {
  console.log(`محاكاة حذف من: ${API_BASE_URL}${ENDPOINTS.deleteItem(id)}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const initialLength = mockItems.length;
      // FIX: Cannot assign to an imported constant. Mutate the array directly.
      const itemIndex = mockItems.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        mockItems.splice(itemIndex, 1);
      }
      resolve({ success: mockItems.length < initialLength });
    }, SIMULATED_DELAY);
  });
};


// دالة لجلب التعليقات لعنصر معين
export const getComments = async (itemId: number): Promise<Comment[]> => {
  console.log(`محاكاة جلب تعليقات من: ${API_BASE_URL}${ENDPOINTS.getComments(itemId)}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const comments = mockComments.filter(comment => comment.itemId === itemId);
      resolve(comments);
    }, SIMULATED_DELAY);
  });
};

// دالة لإضافة تعليق جديد
export const addComment = async (itemId: number, commentData: { author: string; text: string }): Promise<Comment> => {
    console.log(`محاكاة إضافة تعليق إلى: ${API_BASE_URL}${ENDPOINTS.addComment(itemId)}`);
    return new Promise(resolve => {
        setTimeout(() => {
            const newComment: Comment = {
                id: Date.now(),
                itemId,
                author: commentData.author,
                text: commentData.text,
                timestamp: new Date().toISOString(),
            };
            mockComments.push(newComment);
            resolve(newComment);
        }, SIMULATED_DELAY);
    });
};
