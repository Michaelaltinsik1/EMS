import Filter from './Filter';
import Button from '../Base/Button';
import { useContext } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';
import { Theme } from 'src/Types/enums';

interface ContentmanagementProps {
  buttonContent: string;
  showAddButton?: boolean;
  toggleAddForm?: () => void;
}
const Contentmanagement = ({
  buttonContent,
  showAddButton = true,
  toggleAddForm,
}: ContentmanagementProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex justify-between py-2 px-4 items-center ${
        theme === Theme.LIGHT ? 'bg-gray-200 ' : 'bg-gray-800'
      }`}
    >
      <Filter theme={theme} />
      {showAddButton && (
        <Button
          onClick={toggleAddForm}
          className="max-w-[50%] tablet:max-w-[200px]"
          variant="addButton"
          type="button"
        >
          {buttonContent}
        </Button>
      )}
    </div>
  );
};
export default Contentmanagement;
