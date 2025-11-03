import { CheckCircle, XCircle, Info } from 'lucide-react';

interface Props {
  showSuccess: boolean;
  successMessage: string;
  showDelete: boolean;
  deleteMessage: string;
  showError: boolean;
  errorMessage: string;
}

export function UserNotifications(props: Props) {
  const {
    showSuccess,
    successMessage,
    showDelete,
    deleteMessage,
    showError,
    errorMessage,
  } = props;

  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {showSuccess && (
        <div className="flex items-center gap-2 rounded-md bg-green-100 p-4 text-green-800 shadow-md">
          <CheckCircle className="h-5 w-5" />
          <p>{successMessage}</p>
        </div>
      )}
      {showDelete && (
        <div className="flex items-center gap-2 rounded-md bg-yellow-100 p-4 text-yellow-800 shadow-md">
          <Info className="h-5 w-5" />
          <p>{deleteMessage}</p>
        </div>
      )}
      {showError && (
        <div className="flex items-center gap-2 rounded-md bg-red-100 p-4 text-red-800 shadow-md">
          <XCircle className="h-5 w-5" />
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
