import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';

export function ToastDemo() {
  const toast = useToast();

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Toast Demo</h3>
      <div className="flex gap-2">
        <Button onClick={() => toast.success('Success!')}>Success</Button>
        <Button onClick={() => toast.error('Error!')} variant="destructive">Error</Button>
        <Button onClick={() => toast.info('Info!')} variant="outline">Info</Button>
      </div>
    </div>
  );
}