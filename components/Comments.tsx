
import React, { useState, useEffect } from 'react';
import type { Comment } from '../types';
import { getComments, addComment } from '../services/apiService';

interface CommentsProps {
  itemId: number;
}

const Comments: React.FC<CommentsProps> = ({ itemId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // جلب التعليقات عند تحميل المكون
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      const fetchedComments = await getComments(itemId);
      setComments(fetchedComments);
      setIsLoading(false);
    };
    fetchComments();
  }, [itemId]);

  // دالة لإرسال تعليق جديد
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;
    
    const addedComment = await addComment(itemId, { author, text: newComment });
    setComments([...comments, addedComment]);
    setNewComment('');
    setAuthor('');
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">التعليقات</h4>
      {isLoading ? (
        <p>جاري تحميل التعليقات...</p>
      ) : (
        <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-bold text-gray-800">{comment.author}</p>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">لا توجد تعليقات حتى الآن.</p>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
         <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="اسمك"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="أضف تعليقًا..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          rows={2}
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          إرسال
        </button>
      </form>
    </div>
  );
};

export default Comments;
