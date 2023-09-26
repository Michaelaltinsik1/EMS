import { ThemeContext } from './Context/ThemeProvider';
import { ReactNode, useContext } from 'react';
import { Theme } from 'src/Types/enums';

interface OverlayProps {
  handleOnClick: () => void;
  children: ReactNode;
}
const Overlay = ({ handleOnClick, children }: OverlayProps) => {
  const { theme } = useContext(ThemeContext);
  const clickHandler = (e: any) => {
    e.stopPropagation();
    handleOnClick();
    document.body.classList.remove('disableScroll');
  };
  return (
    <div
      onClick={(e) => clickHandler(e)}
      className={`box-border z-50 fixed w-full h-full bg-opacity-80 top-0 left-0 ${
        theme === Theme.LIGHT ? 'bg-gray-300' : 'bg-gray-700'
      }`}
    >
      {children}
    </div>
  );
};
export default Overlay;
