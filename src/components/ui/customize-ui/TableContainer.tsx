import { ReactNode } from 'react';

interface TableContainerProps {
  children: ReactNode;
}

export function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-sm">
      {children}
    </div>
  );
}