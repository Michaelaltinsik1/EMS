import { Link, useLocation } from 'react-router-dom';
import Button from '../Base/Button';
import Close from 'src/Icons/Close.svg';
import Paragraph from '../Base/Paragrapgh';
import Heading from '../Base/Heading';
import { useContext } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';
import { Theme } from 'src/Types/enums';
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
      className={`min-h-screen absolute top-[0] w-screen p-4 flex flex-col tablet:max-w-[400px] ${
        theme === Theme.LIGHT ? 'bg-gray-200' : 'bg-gray-800'
      }`}
    >
      <img
        className="w-[32px] h-[32px] tablet:w-[50px] tablet:h-[50px] self-end cursor-pointer"
        src={Close}
        onClick={toggleMenuState}
        alt="Close Menu"
      />
      <div className="flex flex-col items-center px-10">
        <div className="flex mt-4">
          <div className="mr-2">Icon</div>
          <Heading className="ml-2" type="H3" content="Micke" />
        </div>
        <div className="flex items-center mt-1">
          <Heading type="H3" content="Role: " />
          <Paragraph className="ml-2" type="body" content="Admin" />
        </div>
      </div>
      <Button
        className="mt-9 max-w-[140px] self-center"
        type="button"
        variant="removeButton"
      >
        Sign out
      </Button>
      <nav className="flex flex-col mt-10">
        {menuOptions.map((menuOption) => (
          <Link
            className={`text-H2Mobile py-4 px-10  ${
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
