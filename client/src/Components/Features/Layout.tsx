import SideBar from './SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import ThemeButton from './ThemeButton';
import Header from './header';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';
import { Theme } from 'src/Types/enums';
import { useContext } from 'react';
interface LayoutProps {
  isAdmin?: boolean;
}
const Layout = ({ isAdmin = false }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const toggleMenuState = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  return (
    <main
      className={`min-h-screen ${
        theme === Theme.LIGHT ? 'bg-gray-100' : 'bg-gray-700'
      }`}
    >
      <Header toggleMenuState={toggleMenuState} isMenuOpen={isMenuOpen} />
      <ThemeButton />
      {isAdmin
        ? isMenuOpen && (
            <SideBar
              toggleMenuState={toggleMenuState}
              menuOptions={[
                { menuOption: 'Employees', url: '/employee/admin' },
                { menuOption: 'Departments', url: '/department/admin' },
                { menuOption: 'Leaves', url: '/leave/admin' },
                { menuOption: 'Projects', url: '/project/admin' },
                { menuOption: 'Roles', url: '/role/admin' },
                { menuOption: 'Timereport', url: '/timereport/admin' },
                { menuOption: 'Notice', url: '/notice/admin' },
              ]}
            />
          )
        : isMenuOpen && (
            <SideBar
              toggleMenuState={toggleMenuState}
              menuOptions={[
                { menuOption: 'My account', url: '/manageaccount' },
                { menuOption: 'Leave', url: '/leave' },
                { menuOption: 'Projects', url: '/project' },
                { menuOption: 'Time reports', url: '/timereport' },
                { menuOption: 'Notice', url: '/notice' },
              ]}
            />
          )}
      <Outlet />
    </main>
  );
};
export default Layout;
