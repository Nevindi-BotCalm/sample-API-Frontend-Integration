export function useUserActions(userTable: any, state: any, showMessage: any) {
  const handleEdit = (index: number) => {
    userTable.setEditingIndex(index);
    state.setDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    userTable.setUserToDelete(index);
    state.setDeleteDialogOpen(true);
  };

  const handleView = (index: number) => {
    console.log('handleView called with index:', index);
    console.log('User at index:', userTable.users[index]);
    userTable.setViewingUser(userTable.users[index]);
    state.setViewDialogOpen(true);
  };

  const handleSubmit = (user: any) => {
    try {
      if (userTable.editingIndex !== null) {
        userTable.updateUser(userTable.editingIndex, user);
        showMessage('success', 'User updated successfully');
      } else {
        userTable.addUser(user);
        showMessage('success', 'User added successfully');
      }
      state.setDialogOpen(false);
      userTable.setEditingIndex(null);
    } catch {
      showMessage('error', 'Failed to save user');
    }
  };

  const handleDialogClose = (open: boolean) => {
    state.setDialogOpen(open);
    if (!open) {
      userTable.setEditingIndex(null);
    }
  };

  const handleViewDialogClose = (open: boolean) => {
    state.setViewDialogOpen(open);
    if (!open) {
      userTable.setViewingUser(null);
    }
  };

  const handleConfirmDelete = () => {
    if (userTable.userToDelete !== null) {
      const user = userTable.users[userTable.userToDelete];
      state.setDeletedUser(user);
      userTable.deleteUser(userTable.userToDelete);
      state.setDeleteDialogOpen(false);
      state.setShowUndoNotification(true);
      showMessage('success', 'User deleted successfully');

      let countdown = 5;
      state.setUndoCountdown(countdown);
      const interval = setInterval(() => {
        state.setUndoCountdown(--countdown);
        if (countdown === 0) {
          clearInterval(interval);
          state.setShowUndoNotification(false);
        }
      }, 1000);
    }
  };

  return { handleEdit, handleDelete, handleView, handleSubmit, handleConfirmDelete, handleDialogClose, handleViewDialogClose };
}