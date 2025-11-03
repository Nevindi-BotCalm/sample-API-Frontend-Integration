import { Button } from '@/components/ui/button';
import { User } from '@/store/userStore';
import { Trash2, Copy } from 'lucide-react';

interface Props {
  selectedUsers: Set<number>;
  users: User[];
  onBulkDelete: () => void;
  onCopyEmails: () => void;
}

export function BulkActions({ selectedUsers, onBulkDelete, onCopyEmails }: Props) {
  if (selectedUsers.size === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {selectedUsers.size} selected
      </span>
      <Button variant="outline" size="sm" onClick={onBulkDelete}>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Selected
      </Button>
      <Button variant="outline" size="sm" onClick={onCopyEmails}>
        <Copy className="mr-2 h-4 w-4" />
        Copy Emails
      </Button>
    </div>
  );
}
