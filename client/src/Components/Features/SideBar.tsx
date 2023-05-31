import { Link, useLocation } from 'react-router-dom';
import Button from '../Base/Button';
import Paragraph from '../Base/Paragrapgh';
import Heading from '../Base/Heading';
import { useContext } from 'react';
import { ThemeContext } from './Context/ThemeProvider';
import { Theme } from 'src/Types/enums';
import Icon from '../Base/Icon';
interface MenuProps {
  menuOptions: Array<MenuOption>;
  toggleMenuState: () => void;
}
interface MenuOption {
  menuOption: string;
  url: string;
}
const SideBar = ({ menuOptions, toggleMenuState }: MenuProps) => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  return (
    <aside
      className={`z-[999] min-h-screen absolute tablet:fixed top-[0] w-screen flex flex-col tablet:max-w-[400px] tablet:right-0 overflow-scroll  ${
        theme === Theme.LIGHT ? 'bg-gray-200' : 'bg-gray-800'
      }`}
    >
      <div className="p-4 desktop:py-[40px] desktop:px-[56px] flex items-end justify-end">
        <Icon
          className="cursor-pointer"
          onClick={toggleMenuState}
          name="Close"
          theme={theme}
        />
      </div>

      <div className="flex flex-col items-center px-10">
        <div className="flex mt-4 items-center">
          <Icon name="Person" theme={theme} />
          <Heading className="ml-2" type="H3" content="Micke" />
        </div>
        <div className="flex items-center mt-1">
          <Heading type="H3" content="Role: " />
          <Paragraph className="ml-2" type="body" content="Admin" />
        </div>
      </div>
      <Button
        className="mt-9 max-w-[140px] self-center "
        type="button"
        variant="removeButton"
      >
        Sign out
      </Button>
      <nav className="flex flex-col mt-10 mb-[64px]">
        {menuOptions.map((menuOption) => (
          <Link
            className={`text-H2Mobile desktopEdgeCases:text-H2 py-4 px-10 desktop:px-[64px]  ${
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
  );
};
export default SideBar;
