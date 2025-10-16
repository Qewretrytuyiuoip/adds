
import { Item, Comment } from '../types';

// بيانات وهمية للعناصر
export let mockItems: Item[] = [
  {
    id: 1,
    title: "لابتوب حديث",
    description: "لابتوب بمعالج Core i7، رام 16 جيجا، وتخزين 512 SSD.",
    price: 4500,
    imageUrl: "https://picsum.photos/seed/laptop/400/300",
    isFavorite: true,
  },
  {
    id: 2,
    title: "هاتف ذكي",
    description: "هاتف بشاشة AMOLED، كاميرا 108 ميجابكسل، وبطارية تدوم طويلاً.",
    price: 2800,
    imageUrl: "https://picsum.photos/seed/phone/400/300",
    isFavorite: false,
  },
  {
    id: 3,
    title: "ساعة يد أنيقة",
    description: "ساعة سويسرية الصنع بتصميم كلاسيكي مقاومة للماء.",
    price: 1200,
    imageUrl: "https://picsum.photos/seed/watch/400/300",
    isFavorite: false,
  },
  {
    id: 4,
    title: "كاميرا احترافية",
    description: "كاميرا DSLR بدقة 24 ميجابكسل مع عدسة 18-55mm.",
    price: 3200,
    imageUrl: "https://picsum.photos/seed/camera/400/300",
    isFavorite: true,
  },
];

// بيانات وهمية للتعليقات
export let mockComments: Comment[] = [
    { id: 1, itemId: 1, author: "أحمد", text: "منتج رائع، هل السعر قابل للتفاوض؟", timestamp: new Date().toISOString() },
    { id: 2, itemId: 1, author: "فاطمة", text: "ما هي حالة البطارية؟", timestamp: new Date().toISOString() },
    { id: 3, itemId: 2, author: "خالد", text: "هل الهاتف جديد أم مستعمل؟", timestamp: new Date().toISOString() },
];
