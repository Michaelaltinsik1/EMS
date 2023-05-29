import { ThemeContext } from './ThemeProvider';
import { ReactNode, useContext } from 'react';
import { Theme } from 'src/Types/enums';
import Icon from '../Base/Icon';
import Overlay from './Overlay';
interface ModalProps {
  children: ReactNode | ReactNode[];
  handleOnClick: () => void;
}
const Modal = ({ children, handleOnClick }: ModalProps) => {
  const { theme } = useContext(ThemeContext);
  const closeOnClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <>
      <div
        onClick={(e) => closeOnClick(e)}
        className={`box-border absolute z-[1000] left-0 right-0 rounded-[16px] mx-4 px-[16px] py-[24px] tablet:mx-[56px] 
        tabletEdgeCases:max-w-[828px] tabletEdgeCases:mx-auto tabletEdgeCases:px-[64px] tabletEdgeCases:py-[32px] ${
          theme === Theme.LIGHT
            ? 'bg-gray-200 shadow-lightShadow'
            : 'bg-gray-700 shadow-darkShadow'
        }`}
      >
        <div>
          <Icon
            onClick={handleOnClick}
            className="ml-auto"
            name="Close"
            theme={theme}
          />
        </div>
        {children}
      </div>
      <Overlay handleOnClick={handleOnClick} />
    </>
  );
};

export default Modal;
