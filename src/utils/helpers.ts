import toast from 'react-hot-toast';
import axios from 'axios';

interface ToastData {
  type: 'success' | 'error' | 'info';
  message: string;
}

export function handleBackendToast(toastData?: ToastData) {
  if (!toastData) return;
  
  if (toastData.type === 'success') {
    toast.success(toastData.message);
  } else if (toastData.type === 'error') {
    toast.error(toastData.message);
  } else {
    toast(toastData.message);
  }
}

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      handleBackendToast(error.response.data?.toast);
      if (!error.response.data?.toast) {
        toast.error(error.response.data?.error || 'Request failed');
      }
    } else if (error.request) {
      toast.error('Cannot connect to server. Please check your connection.');
    } else {
      toast.error('Request failed. Please try again.');
    }
  } else {
    toast.error('An unexpected error occurred');
  }
}
