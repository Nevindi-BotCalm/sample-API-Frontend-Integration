// components/user/UserDialogs.tsx
import { UserForm } from '@/components/user/UserForm';
import { UserDeleteDialog } from '@/components/user/UserDeleteDialog';
import { UserViewDialog } from '@/components/user/UserViewDialog';
import { UndoNotification } from '@/components/user/UndoNotification';
import { User } from '@/store/userStore';

interface Props {
  dialogStates: {
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    deleteDialogOpen: boolean;
    setDeleteDialogOpen: (open: boolean) => void;
    viewDialogOpen: boolean;
    setViewDialogOpen: (open: boolean) => void;
    showUndoNotification: boolean;
    undoCountdown: number;
    deletedUser: User | null;
    onUndo: () => void;
    onDismiss: () => void;
  };
  editingUser?: User;
  onSubmit: (user: User) => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  onConfirmDelete: () => void;
  viewingUser?: User | null;
}

export default function UserDialogs(props: Props) {
  const {
    dialogStates,
    editingUser,
    onSubmit,
    onSuccess,
    onError,
    onConfirmDelete,
    viewingUser,
  } = props;
  return (
    <>
      <UserForm
        open={dialogStates.dialogOpen}
        onOpenChange={dialogStates.setDialogOpen}
        editingUser={editingUser}
        onSubmit={onSubmit}
        onSuccess={onSuccess}
        onError={onError}
      />
      <UserDeleteDialog
        open={dialogStates.deleteDialogOpen}
        onOpenChange={dialogStates.setDeleteDialogOpen}
        onConfirm={onConfirmDelete}
      />
      <UserViewDialog
        open={dialogStates.viewDialogOpen}
        onOpenChange={dialogStates.setViewDialogOpen}
        user={viewingUser ?? null}
      />

      <UndoNotification
        show={dialogStates.showUndoNotification}
        countdown={dialogStates.undoCountdown}
        message={`Deleted user: ${dialogStates.deletedUser?.name || 'User'}`}
        onUndo={dialogStates.onUndo}
        onDismiss={dialogStates.onDismiss}
      />
    </>
  );
}
