import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-neutral-900 text-white rounded-full shadow-2xl text-sm tracking-wide font-medium border border-neutral-800"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
          <span>{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
