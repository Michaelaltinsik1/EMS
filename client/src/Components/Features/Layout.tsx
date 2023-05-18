import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
interface LayoutProps {
  isAdmin?: boolean;
}
const Layout = ({ isAdmin = false }: LayoutProps) => {
  return (
    <main>
      <header>
        <h1>test</h1>
        <p>dfdfdf</p>
      </header>
      {isAdmin ? (
        <SideBar
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
      ) : (
        <SideBar
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
