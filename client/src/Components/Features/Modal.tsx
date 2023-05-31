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
      <Overlay handleOnClick={handleOnClick}>
        <div
          onClick={(e) => closeOnClick(e)}
          className={`box-border z-[1000] rounded-[16px] mx-4 px-[16px] py-[24px] tablet:mx-[56px] max-h-[calc(100%-32px)] overflow-scroll
        tabletEdgeCases:max-w-[828px] tabletEdgeCases:mx-auto tabletEdgeCases:px-[64px] tabletEdgeCases:py-[32px] mt-4  ${
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
      </Overlay>
    </>
  );
};

export default Modal;
