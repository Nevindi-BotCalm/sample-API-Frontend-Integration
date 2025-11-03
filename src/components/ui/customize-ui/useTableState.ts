import { useState } from 'react';

export function useTableState() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [showUndoNotification, setShowUndoNotification] = useState(false);
  const [undoCountdown, setUndoCountdown] = useState(5);
  const [deletedUser, setDeletedUser] = useState<null | any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchLoading(true);
    setTimeout(() => {
      setSearchTerm(value);
      setSearchLoading(false);
    }, 300);
  };

  return {
    searchTerm,
    setSearchTerm,
    searchLoading,
    setSearchLoading,
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    viewDialogOpen,
    setViewDialogOpen,
    showUndoNotification,
    setShowUndoNotification,
    undoCountdown,
    setUndoCountdown,
    deletedUser,
    setDeletedUser,
    showSuccess,
    setShowSuccess,
    successMessage,
    setSuccessMessage,
    showError,
    setShowError,
    errorMessage,
    setErrorMessage,
    handleSearchChange,
  };
}