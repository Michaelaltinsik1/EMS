import { toast } from 'react-toastify';

interface ToastProps {
  message: string;
  id: string;
  isSuccess?: boolean;
}
export const Toast = ({ message, id, isSuccess = true }: ToastProps) => {
  return isSuccess
    ? toast.success(message, {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: true,
        theme: 'light',
        toastId: id,
      })
    : toast.error(message, {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: true,
        theme: 'light',
        toastId: id,
      });
};
