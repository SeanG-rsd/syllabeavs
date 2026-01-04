import { sendSuggestions } from '@/app/api/google/calendar';
import React, { useState } from 'react';

const SuggestionModal = ({ onClose }: { onClose: () => void }) => {
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Suggestion:", suggestion);
    await sendSuggestions(suggestion);
    setSuggestion('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">New Feature? 🦫</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <label htmlFor="suggestion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            What would make SyllaBeavs better for you?
          </label>
          <textarea
            id="suggestion"
            rows={4}
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none text-zinc-900 dark:text-white"
            placeholder="Example: Integration with Canvas calendar..."
            required
          />

          {/* Footer Actions */}
          <div className="mt-6 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95"
            >
              Send Suggestion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuggestionModal;