import { useContext } from 'react';
import { ThemeContext } from './Context/ThemeProvider';
import Icon from '../Base/Icon';

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className={`w-[96px] flex border border-solid ${
        theme === 'light'
          ? 'bg-gray-100 border-gray-900 hover:bg-gray-200 active:bg-gray-300'
          : 'bg-gray-800 border-gray-400 hover:bg-gray-900 active:bg-[#000]'
      } p-1 box-content items-center justify-between rounded-[32px]`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Icon
          className="w-[32px] h-[32px] ml-2 order-1"
          name="Moon"
          theme={theme}
        />
      ) : (
        <Icon
          className="w-[32px] h-[32px] mr-3 order-2"
          name="Sun"
          theme={theme}
        />
      )}
      <div
        className={`rounded-[50%] bg-blue-400 h-[40px] w-[40px] ${
          theme === 'light' ? 'order-2' : 'order-1'
        }`}
      ></div>
    </button>
  );
};
export default ThemeButton;
