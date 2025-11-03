import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBox } from './search-box';
import { BulkActions } from '@/components/user/BulkActions';
import { DataTableViewOptions } from '@/components/DataTableViewOptions';
import { Table } from '@tanstack/react-table';

interface TableActionsProps {
  onAddUser: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchLoading: boolean;
  selectedUsers: Set<number>;
  users: any[];
  onBulkDelete: () => void;
  onCopyEmails: () => void;
  table: Table<any>;
}

export function TableActions({
  onAddUser,
  searchTerm,
  onSearchChange,
  searchLoading,
  selectedUsers,
  users,
  onBulkDelete,
  onCopyEmails,
  table,
}: TableActionsProps) {
  return (
    <div className="flex items-center gap-4 p-6">
      <Button onClick={onAddUser}>
        <UserPlus className="mr-2 h-4 w-4" />
        Add New User
      </Button>
      


      <BulkActions
        selectedUsers={selectedUsers}
        users={users}
        onBulkDelete={onBulkDelete}
        onCopyEmails={onCopyEmails}
      />

      <div className="ml-auto flex items-center gap-2">
        <div className="w-72">
          <SearchBox
            placeholder="Search users..."
            value={searchTerm}
            onChange={onSearchChange}
            loading={searchLoading}
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}