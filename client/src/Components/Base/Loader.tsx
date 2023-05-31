import { useContext } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';

import { Theme } from 'src/Types/enums';

interface LoaderProps {
  isDotLoader?: boolean;
}
const Loader = ({ isDotLoader = true }: LoaderProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {isDotLoader ? (
        <div className="flex justify-center items-center">
          <div className="relative flex">
            <div className="w-3 h-3 bg-gray-900 rounded-full mr-4 animate-loader "></div>
            <div className="w-3 h-3 bg-gray-900 rounded-full mr-4 animate-loader"></div>
            <div className="w-3 h-3 bg-gray-900 rounded-full animate-loader"></div>
          </div>
        </div>
      ) : (
        <span
          className={`w-[64px] h-[64px] border-[8px] border-solid border-b-[transparent] rounded-[50%] inline-block box-border animate-spin ${
            theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
          }`}
        ></span>
      )}
    </>
  );
};
export default Loader;
