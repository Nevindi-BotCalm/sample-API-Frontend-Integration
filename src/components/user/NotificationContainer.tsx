import { UserNotifications } from '@/components/user/UserNotifications';
import { UndoNotification } from './UndoNotification';

interface NotificationContainerProps {
  state: any;
  onUndo: () => void;
  onDismiss: () => void;
}

export function NotificationContainer({ state, onUndo, onDismiss }: NotificationContainerProps) {
  return (
    <>
      <UndoNotification
        show={state.showUndoNotification}
        message="User deleted"
        onUndo={onUndo}
        onDismiss={onDismiss}
        countdown={state.undoCountdown}
      />
      <UserNotifications
        showSuccess={state.showSuccess}
        successMessage={state.successMessage}
        showDelete={state.showUndoNotification}
        deleteMessage="User deleted"
        showError={state.showError}
        errorMessage={state.errorMessage}
      />
    </>
  );
}