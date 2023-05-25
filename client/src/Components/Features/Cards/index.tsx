import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeProvider';
import { Theme } from 'src/Types/enums';
import EmployeeCardContent from './EmployeesCardContent';
import DepartmentCardContent from './DepartmentCardContent';
import LeaveCardContent from './LeaveCardContent';
import ProjectCardContent from './ProjectCardContent';
import RoleCardContent from './RoleCardContent';
import {
  UserType,
  LeaveType,
  DepartmentType,
  ProjectType,
  RoleType,
  Time_reportType,
  NoticeType,
  PermissionType,
} from 'src/Types';
import TimereportCardContent from './TimereportCardContent';
import NoticeCardContent from './NoticeCardContent';
interface CardProps {
  user?: UserType;
  leave?: LeaveType;
  department?: DepartmentType;
  project?: ProjectType;
  role?: RoleType;
  timereport?: Time_reportType;
  notice?: NoticeType;
  permission?: PermissionType;
}
const Card = ({
  user,
  leave,
  department,
  project,
  role,
  timereport,
  notice,
  permission,
}: CardProps) => {
  const { theme } = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const renderCardContent = () => {
    if (user) {
      console.log('user!');
      return (
        <EmployeeCardContent
          isExpanded={isExpanded}
          theme={theme}
          user={user}
        />
      );
    } else if (department) {
      return (
        <DepartmentCardContent
          department={department}
          isExpanded={isExpanded}
          theme={theme}
        />
      );
    } else if (leave && permission) {
      return (
        <LeaveCardContent
          permission={permission}
          leave={leave}
          isExpanded={isExpanded}
          theme={theme}
        />
      );
    } else if (project && permission) {
      return (
        <ProjectCardContent
          permission={permission}
          project={project}
          isExpanded={isExpanded}
          theme={theme}
        />
      );
    } else if (role) {
      return (
        <RoleCardContent role={role} isExpanded={isExpanded} theme={theme} />
      );
    } else if (timereport && permission) {
      return (
        <TimereportCardContent
          permission={permission}
          timereport={timereport}
          isExpanded={isExpanded}
          theme={theme}
        />
      );
    } else if (notice && permission) {
      return (
        <NoticeCardContent
          permission={permission}
          notice={notice}
          isExpanded={isExpanded}
          theme={theme}
        />
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
