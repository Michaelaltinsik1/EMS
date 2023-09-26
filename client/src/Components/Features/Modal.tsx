import { ThemeContext } from '../Features/Context/ThemeProvider';
import { ReactNode, useContext, useEffect } from 'react';
import { Theme } from 'src/Types/enums';
import Icon from '../Base/Icon';
import Overlay from './Overlay';

interface ModalProps {
  children: ReactNode | ReactNode[];
  handleOnClick: () => void;
  className?: string;
}
const Modal = ({ children, handleOnClick, className = '' }: ModalProps) => {
  const { theme } = useContext(ThemeContext);
  document.body.classList.add('disableScroll');
  const closeOnClick = (e: any) => {
    e.stopPropagation();
    document.body.classList.remove('disableScroll');
  };

  return (
    <>
      <Overlay handleOnClick={handleOnClick}>
        <div
          onClick={(e) => closeOnClick(e)}
          className={`box-border z-[1000] rounded-[16px] mx-4 px-[16px] py-[24px] tablet:mx-[56px] max-h-[calc(100%-32px)] 
        tabletEdgeCases:max-w-[828px] tabletEdgeCases:mx-auto tabletEdgeCases:px-[64px] tabletEdgeCases:py-[32px] mt-4  ${
          theme === Theme.LIGHT
            ? 'bg-gray-200 shadow-lightShadow'
            : 'bg-gray-700 shadow-darkShadow'
        } ${className}`}
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
      </Overlay>
    </>
  );
};

export default Modal;
