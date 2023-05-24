import { ReactComponent as Menu } from 'src/Icons/Menu.svg';
import { ReactComponent as Close } from 'src/Icons/close.svg';
import { ReactComponent as Person } from 'src/Icons/person.svg';
import { ReactComponent as Minimize } from 'src/Icons/Minimize.svg';
import { ReactComponent as Logo } from 'src/Icons/logo.svg';
import { Theme } from 'src/Types/enums';
interface IconProps {
  name: 'Close' | 'Expand' | 'Logo' | 'Menu' | 'Minimize' | 'Person';
  theme: Theme;
  onClick?: () => void;
  className?: string;
}

const Icon = ({ name, theme, onClick, className = '' }: IconProps) => {
  const color = theme === Theme.LIGHT ? '#212121' : '#FAFAFA';
  const renderIcon = () => {
    switch (name) {
      case 'Close':
        return (
          <Close
            className={`w-[52px] h-[52px] cursor-pointer ${className}`}
            onClick={onClick}
            stroke={color}
          />
        );
      case 'Expand':
        return (
          <Minimize
            className={`w-[52px] h-[52px] rotate-180 cursor-pointer ${className}`}
            onClick={onClick}
            stroke={color}
          />
        );
      case 'Logo':
        return (
          <Logo
            className={`w-[52px] h-[52px] cursor-pointer ${className}`}
            onClick={onClick}
          />
        );
      case 'Menu':
        return (
          <Menu
            className={`w-[52px] h-[52px] cursor-pointer ${className}`}
            onClick={onClick}
            fill={color}
          />
        );
      case 'Minimize':
        return (
          <Minimize
            className={`w-[52px] h-[52px] cursor-pointer ${className}`}
            onClick={onClick}
            stroke={color}
          />
        );
      case 'Person':
        return (
          <Person
            className={`w-[52px] h-[52px] ${className}`}
            onClick={onClick}
            fill={color}
          />
        );
    }
  };
  return renderIcon();
};
export default Icon;
