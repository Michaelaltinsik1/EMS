import SideBar from './SideBar';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './header';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../Features/Context/ThemeProvider';
import { Theme } from 'src/Types/enums';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthProvider';
import AuthGuard from './AuthGuard';
interface LayoutProps {
  isAdmin?: boolean;
}
const Layout = ({ isAdmin = false }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const toggleMenuState = () => {
    setIsMenuOpen((prevState) => !prevState);
    if (isMenuOpen) {
      document.body.classList.remove('disableScroll');
    } else {
      document.body.classList.add('disableScroll');
    }
  };
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.classList.remove('disableScroll');
  }, [location]);

  return (
    <AuthGuard permission={user?.permission}>
      <main
        className={`min-h-screen ${
          theme === Theme.LIGHT ? 'bg-gray-100' : 'bg-gray-700'
        }`}
      >
        {isAdmin && user?.permission === 'ADMIN'
          ? isMenuOpen && (
              <SideBar
                user={user}
                toggleMenuState={toggleMenuState}
                menuOptions={[
                  { menuOption: 'My account', url: '/manageaccount/admin' },
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
                user={user}
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
        <Header toggleMenuState={toggleMenuState} isMenuOpen={isMenuOpen} />

        <Outlet />
      </main>
    </AuthGuard>
  );
};
export default Layout;
