import { ThemeContext } from './ThemeProvider';
import { useContext } from 'react';
import { Theme } from 'src/Types/enums';
interface OverlayProps {
  handleOnClick: () => void;
}
const Overlay = ({ handleOnClick }: OverlayProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      onClick={handleOnClick}
      className={`box-border z-50 absolute w-full h-full bg-opacity-80 top-0 left-0 ${
        theme === Theme.LIGHT ? 'bg-gray-300' : 'bg-gray-700'
      }`}
    ></div>
  );
};
export default Overlay;
