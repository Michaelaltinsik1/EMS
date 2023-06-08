import { toast } from 'react-toastify';

import { Theme } from 'src/Types/enums';

interface ToastProps {
  message: string;
  id: string;
  isSuccess?: boolean;
  theme: Theme;
}
export const Toast = ({ message, id, isSuccess = true, theme }: ToastProps) => {
  return isSuccess
    ? toast.success(message, {
        position: 'bottom-right',
        autoClose: 2000,
        closeOnClick: true,
        theme: `${theme === Theme.LIGHT ? 'light' : 'dark'}`,
        toastId: id,
      })
    : toast.error(message, {
        position: 'bottom-right',
        autoClose: 2000,
        closeOnClick: true,
        theme: `${theme === Theme.LIGHT ? 'light' : 'dark'}`,
        toastId: id,
      });
};
