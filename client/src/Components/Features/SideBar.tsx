import { Link } from 'react-router-dom';
interface MenuProps {
  menuOptions: Array<MenuOption>;
}
interface MenuOption {
  menuOption: string;
  url: string;
}
const SideBar = ({ menuOptions }: MenuProps) => {
  return (
    <aside>
      <div>
        <div>Icon</div>
        <h2>Micke</h2>
      </div>
      <div>
        <h3>Role:</h3>
        <p>Admin</p>
      </div>
      <nav>
        {menuOptions.map((menuOption) => (
          <Link to={menuOption.url}>{menuOption.menuOption}</Link>
        ))}
      </nav>
    </aside>
  );
};
export default SideBar;
