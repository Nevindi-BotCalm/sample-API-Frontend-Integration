export function useNotifications(state: any) {
  const showMessage = (type: 'success' | 'error', msg: string) => {
    const setters: Record<'success' | 'error', [any, any]> = {
      success: [state.setSuccessMessage, state.setShowSuccess],
      error: [state.setErrorMessage, state.setShowError],
    };
    setters[type][0](msg);
    setters[type][1](true);
    setTimeout(() => setters[type][1](false), 3000);
  };

  return { showMessage };
}