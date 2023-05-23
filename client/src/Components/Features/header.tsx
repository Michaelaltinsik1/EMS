import Heading from '../Base/Heading';
import Logo from 'src/Icons/logo.svg';
import Menu from 'src/Icons/Menu.svg';
import Close from 'src/Icons/Close.svg';
import { useContext } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';
import { Theme } from 'src/Types/enums';
import { useNavigate, useLocation } from 'react-router-dom';
interface HeaderProps {
  toggleMenuState: () => void;
  isMenuOpen: boolean;
}
const Header = ({ toggleMenuState, isMenuOpen }: HeaderProps) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = () => {
    if (location.pathname.includes('admin')) {
      navigate('/dashboard/admin');
    } else {
      navigate('/dashboard/');
    }
  };
  return (
    <header
      className={`px-4 py-2 max-h-[64px] desktop:max-h-[160px] flex justify-between items-center desktop:py-[40px] desktop:px-[64px] ${
        theme === Theme.LIGHT ? 'bg-gray-200' : 'bg-gray-800'
      }`}
    >
      <img
        className="w-[40px] h-[40px] desktop:w-[80px] desktop:h-[80px]"
        onClick={handleNavigation}
        src={Logo}
        alt="EMS logo"
      />
      <Heading className="max-w-[400px] text-center " type="H1" content="EMS" />
      <div>
        {isMenuOpen ? (
          <img
            className="w-[32px] h-[32px] tablet:w-[50px] tablet:h-[50px]"
            onClick={toggleMenuState}
            src={Close}
            alt="Close menu"
          />
        ) : (
          <img
            className="w-[32px] h-[32px] tablet:w-[50px] tablet:h-[50px]"
            onClick={toggleMenuState}
            src={Menu}
            alt="Open menu"
          />
        )}
      </div>
    </header>
  );
};
export default Header;
