import { Link, useLocation } from 'react-router-dom';
import Button from '../Base/Button';
import Paragraph from '../Base/Paragrapgh';
import Heading from '../Base/Heading';
import { useContext } from 'react';
import { ThemeContext } from './Context/ThemeProvider';
import { AuthContext } from './Context/AuthProvider';
import { Theme } from 'src/Types/enums';
import Icon from '../Base/Icon';
import ThemeButton from './ThemeButton';
import Overlay from './Overlay';
import { PermissionType } from 'src/Types';
import { getEmployeeInitials } from 'src/utils/functions';
import { useNavigate } from 'react-router-dom';

interface MenuProps {
  menuOptions: Array<MenuOption>;
  toggleMenuState: () => void;
  user: AuthUserType | null;
}
interface MenuOption {
  menuOption: string;
  url: string;
}
interface AuthUserType {
  permission: PermissionType;
  userId: string;
  firstName: string;
  lastName: string;
}
const SideBar = ({ menuOptions, toggleMenuState, user }: MenuProps) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { handleSignInPermissions } = useContext(AuthContext);
  const location = useLocation();

  const handleSignOut = () => {
    handleSignInPermissions(null);
    navigate('/');
  };

  return (
    <Overlay handleOnClick={toggleMenuState}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`z-[999] h-screen overflow-y-scroll mb-9 absolute top-[0] w-screen flex flex-col tablet:max-w-[400px] tablet:right-0 ${
          theme === Theme.LIGHT ? 'bg-gray-200' : 'bg-gray-800'
        }`}
      >
        <div className="p-4 desktop:py-[40px] desktop:px-[56px] flex items-end justify-end">
          <Icon
            onClick={toggleMenuState}
            className="ml-auto cursor-pointer"
            name="Close"
            theme={theme}
          />
        </div>
        <div className="flex items-center justify-around px-10">
          <div>
            <div className="flex items-center">
              <Icon name="Person" theme={theme} />
              {user && (
                <Heading
                  className="ml-2"
                  type="H3"
                  content={getEmployeeInitials(user.firstName, user.lastName)}
                />
              )}
            </div>
            <div className="flex items-center">
              <Heading type="H3" content="Role: " />
              {user && (
                <Paragraph
                  className="ml-2"
                  type="body"
                  content={user.permission}
                />
              )}
            </div>
          </div>
          <ThemeButton />
        </div>

        <Button
          onClick={handleSignOut}
          className="mt-[32px] max-w-[140px] self-center min-h-[52px] "
          type="button"
          variant="removeButton"
        >
          Sign out
        </Button>
        <nav className="flex flex-col mt-[32px] mb-[64px]">
          {menuOptions.map((menuOption) => (
            <Link
              key={menuOption.url}
              className={`text-H2Mobile desktopEdgeCases:text-H3 py-4 px-10 desktop:px-[64px]   ${
                theme === Theme.LIGHT
                  ? 'text-gray-900 hover:text-blue-400'
                  : 'text-gray-100 hover:text-blue-400'
              } ${
                location.pathname === menuOption.url &&
                'underline underline-offset-8'
              }`}
              to={menuOption.url}
            >
              {menuOption.menuOption}
            </Link>
          ))}
        </nav>
      </aside>
    </Overlay>
  );
};
export default SideBar;
