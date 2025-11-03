import { Users } from 'lucide-react';

interface TableHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export function TableHeader({ title, icon = <Users className="h-6 w-6 text-black" /> }: TableHeaderProps) {
  return (
    <div className="flex items-center gap-2 border-b bg-white/50 p-6 text-2xl font-semibold text-slate-800">
      {icon}
      {title}
    </div>
  );
}