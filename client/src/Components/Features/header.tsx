import Heading from '../Base/Heading';
import Logo from 'src/Icons/logo.svg';
import { useContext } from 'react';
import { ThemeContext } from '../Features/Context/ThemeProvider';
import { Theme } from 'src/Types/enums';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../Base/Icon';
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
      <div className="max-w-[52px]">
        {isMenuOpen ? (
          <Icon
            className=""
            onClick={toggleMenuState}
            name="Close"
            theme={theme}
          />
        ) : (
          <Icon onClick={toggleMenuState} name="Menu" theme={theme} />
        )}
      </div>
    </header>
  );
};
export default Header;
