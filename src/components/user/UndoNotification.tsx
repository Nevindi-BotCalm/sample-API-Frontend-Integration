import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";

interface Props {
  show: boolean;
  message: string;
  countdown: number;
  onUndo: () => void;
  onDismiss: () => void;
}

export function UndoNotification({
  show,
  message,
  countdown,
  onUndo,
  onDismiss,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-between gap-5 rounded-2xl 
                     bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-5 text-white shadow-2xl 
                     backdrop-blur-md border border-gray-700/50 min-w-[300px]"
        >
          <div>
            <p className="font-semibold text-base">{message}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
              <div className="relative w-28 h-1 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  key={countdown}
                  initial={{ width: "100%" }}
                  animate={{ width: `${(countdown / 5) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="absolute left-0 top-0 h-full bg-red-400"
                />
              </div>
              <span>{countdown}s</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onUndo}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white rounded-md shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              Undo
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <X className="w-4 h-4" />
              Dismiss
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
