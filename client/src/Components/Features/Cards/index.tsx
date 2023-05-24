import { ReactNode, useContext, useState } from 'react';
import { ThemeContext } from '../ThemeProvider';
import { Theme } from 'src/Types/enums';
import EmployeeCardContent from './EmployeesCardContentAdmin';
import { UserType, LeaveType } from 'src/Types';
interface CardProps {
  user?: UserType;
  leave?: LeaveType;
}
const Card = ({ user, leave }: CardProps) => {
  const { theme } = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const renderCardContent = () => {
    if (user) {
      return (
        <EmployeeCardContent
          isExpanded={isExpanded}
          theme={theme}
          user={user}
        />
      );
    } else if (leave) {
      return (
        <div>
          <h1>Leave</h1>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <article
      onClick={handleToggle}
      className={`w-full rounded-lg px-4 py-6 mb-4 cursor-pointer hover:shadow-none ${
        theme === Theme.LIGHT
          ? 'bg-gray-200 shadow-lightShadow'
          : 'bg-gray-800 shadow-darkShadow'
      }`}
    >
      {renderCardContent()}
    </article>
  );
};
export default Card;
