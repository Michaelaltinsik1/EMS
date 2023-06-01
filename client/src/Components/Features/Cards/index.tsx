import { useContext, useState } from 'react';
import { ThemeContext } from '../Context/ThemeProvider';
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
import DepartmentForm from '../Forms/DepartmentForm';
import LeaveForm from '../Forms/LeaveForm';
import ProjectForm from '../Forms/ProjectForm';
import RoleForm from '../Forms/RoleForm';
import TimereportForm from '../Forms/TimereportForm';
import NoticeForm from '../Forms/NoticeForm';
import EmployeeForm from '../Forms/EmployeeForm';
interface CardProps {
  user?: UserType;
  leave?: LeaveType;
  department?: DepartmentType;
  project?: ProjectType;
  role?: RoleType;
  timereport?: Time_reportType;
  notice?: NoticeType;
  permission?: PermissionType;
  className?: string;
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
  className = '',
}: CardProps) => {
  const { theme } = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
    setIsExpanded(false);
  };
  const renderCardContent = () => {
    if (user) {
      return (
        <>
          <EmployeeCardContent
            isExpanded={isExpanded}
            theme={theme}
            user={user}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <EmployeeForm user={user} handleOnClick={toggleForm} />
          )}
        </>
      );
    } else if (department) {
      return (
        <>
          <DepartmentCardContent
            department={department}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <DepartmentForm
              department={department}
              handleOnClick={toggleForm}
            />
          )}
        </>
      );
    } else if (leave && permission) {
      return (
        <>
          <LeaveCardContent
            permission={permission}
            leave={leave}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && <LeaveForm leave={leave} handleOnClick={toggleForm} />}
        </>
      );
    } else if (project && permission) {
      return (
        <>
          <ProjectCardContent
            permission={permission}
            project={project}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <ProjectForm project={project} handleOnClick={toggleForm} />
          )}
        </>
      );
    } else if (role) {
      return (
        <>
          <RoleCardContent
            role={role}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && <RoleForm role={role} handleOnClick={toggleForm} />}
        </>
      );
    } else if (timereport && permission) {
      return (
        <>
          <TimereportCardContent
            permission={permission}
            timereport={timereport}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <TimereportForm
              timereport={timereport}
              handleOnClick={toggleForm}
            />
          )}
        </>
      );
    } else if (notice && permission) {
      return (
        <>
          <NoticeCardContent
            permission={permission}
            notice={notice}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <NoticeForm notice={notice} handleOnClick={toggleForm} />
          )}
        </>
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
      } ${className}`}
    >
      {renderCardContent()}
    </article>
  );
};
export default Card;
