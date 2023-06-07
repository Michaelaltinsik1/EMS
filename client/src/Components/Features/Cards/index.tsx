import { useContext, useState } from 'react';
import { ThemeContext } from '../Context/ThemeProvider';
import { Theme } from 'src/Types/enums';
import EmployeeCardContent from './EmployeesCardContent';
import DepartmentCardContent from './DepartmentCardContent';
import LeaveCardContent from './LeaveCardContent';
import ProjectCardContent from './ProjectCardContent';
import RoleCardContent from './RoleCardContent';
import RemoveModal from '../RemoveModal';
import { Entities } from 'src/Types/enums';
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
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
    setIsExpanded(false);
  };
  const toggleRemoveModal = () => {
    setIsRemoveModalOpen((prevState) => !prevState);
    setIsExpanded(false);
  };
  const renderCardContent = () => {
    if (user) {
      return (
        <>
          <EmployeeCardContent
            clickHandlerRemove={toggleRemoveModal}
            isExpanded={isExpanded}
            theme={theme}
            user={user}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <EmployeeForm
              setIsFormOpen={setIsFormOpen}
              user={user}
              handleOnClick={toggleForm}
            />
          )}
          {isRemoveModalOpen && (
            <RemoveModal
              id={user.id}
              name={user.firstName + ' ' + user.lastName}
              handleOnClick={toggleRemoveModal}
              Entity={Entities.EMPLOYEE}
            />
          )}
        </>
      );
    } else if (department) {
      return (
        <>
          <DepartmentCardContent
            clickHandlerRemove={toggleRemoveModal}
            department={department}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <DepartmentForm
              setIsFormOpen={setIsFormOpen}
              department={department}
              handleOnClick={toggleForm}
            />
          )}
          {isRemoveModalOpen && (
            <RemoveModal
              id={department.id}
              name={department.name}
              handleOnClick={toggleRemoveModal}
              Entity={Entities.DEPARTMENT}
            />
          )}
        </>
      );
    } else if (leave && permission) {
      return (
        <>
          <LeaveCardContent
            clickHandlerRemove={toggleRemoveModal}
            permission={permission}
            leave={leave}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <LeaveForm
              setIsFormOpen={setIsFormOpen}
              leave={leave}
              handleOnClick={toggleForm}
            />
          )}
          {isRemoveModalOpen && (
            <RemoveModal
              id={leave.id}
              handleOnClick={toggleRemoveModal}
              Entity={Entities.LEAVE}
            />
          )}
        </>
      );
    } else if (project && permission) {
      return (
        <>
          <ProjectCardContent
            clickHandlerRemove={toggleRemoveModal}
            permission={permission}
            project={project}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <ProjectForm
              setIsFormOpen={setIsFormOpen}
              project={project}
              handleOnClick={toggleForm}
            />
          )}
          {isRemoveModalOpen && (
            <RemoveModal
              id={project.id}
              name={project.name}
              handleOnClick={toggleRemoveModal}
              Entity={Entities.PROJECT}
            />
          )}
        </>
      );
    } else if (role) {
      return (
        <>
          <RoleCardContent
            clickHandlerRemove={toggleRemoveModal}
            role={role}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <RoleForm
              setIsFormOpen={setIsFormOpen}
              role={role}
              handleOnClick={toggleForm}
            />
          )}
          {isRemoveModalOpen && (
            <RemoveModal
              id={role.id}
              name={role.name}
              handleOnClick={toggleRemoveModal}
              Entity={Entities.ROLE}
            />
          )}
        </>
      );
    } else if (timereport && permission) {
      return (
        <>
          <TimereportCardContent
            clickHandlerRemove={toggleRemoveModal}
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
              setIsFormOpen={setIsFormOpen}
            />
          )}
          {isRemoveModalOpen && (
            <RemoveModal
              id={timereport.id}
              handleOnClick={toggleRemoveModal}
              Entity={Entities.TIMEREPORT}
            />
          )}
        </>
      );
    } else if (notice && permission) {
      return (
        <>
          <NoticeCardContent
            clickHandlerRemove={toggleRemoveModal}
            permission={permission}
            notice={notice}
            isExpanded={isExpanded}
            theme={theme}
            clickHandler={toggleForm}
          />
          {isFormOpen && (
            <NoticeForm
              setIsFormOpen={setIsFormOpen}
              notice={notice}
              handleOnClick={toggleForm}
            />
          )}
          {isRemoveModalOpen && (
            <RemoveModal
              id={notice.id}
              handleOnClick={toggleRemoveModal}
              Entity={Entities.NOTICE}
            />
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
