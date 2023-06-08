import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeProvider';
import { Theme } from 'src/Types/enums';
import EmployeeRow from './EmployeeTable/EmployeeRow';
import DepartmentRow from './DepartmentTable/DepartmentRow';
import DepartmentHeader from './DepartmentTable/DepartmentHeader';

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
import LeaveRow from './LeaveTable/LeaveRow';
import LeaveHeader from './LeaveTable/LeaveHeader';
import ProjectRow from './ProjectTable/ProjectRow';
import ProjectHeader from './ProjectTable/ProjectHeader';
import RoleRow from './RoleTable/RoleRow';
import RoleHeader from './RoleTable/RoleHeader';
import TimereportRow from './TimereportTable/TimereportRow';
import TimereportHeader from './TimereportTable/TimereportHeader';
import NoticeRow from './NoticeTable/NoticeRow';
import NoticeHeader from './NoticeTable/NoticeHeader';

import { TaskTypes } from 'src/utils/enum';
import EmployeeHeader from './EmployeeTable/EmployeeHeader';
interface CardProps<T> {
  permission?: PermissionType;
  data?: Array<T>;
  type: TaskTypes;
}
const Table = <T extends unknown>({ permission, data, type }: CardProps<T>) => {
  const { theme } = useContext(ThemeContext);

  const renderTableContent = () => {
    if (data && type === TaskTypes.USER) {
      const employees = data as Array<UserType>;
      return (
        <>
          <EmployeeHeader theme={theme} />
          <tbody>
            {employees.map((user) => {
              return <EmployeeRow theme={theme} user={user} key={user.id} />;
            })}
          </tbody>
        </>
      );
    } else if (data && type === TaskTypes.DEPARTMENT) {
      const departments = data as Array<DepartmentType>;
      return (
        <>
          <DepartmentHeader theme={theme} />
          <tbody>
            {departments.map((department) => {
              return (
                <DepartmentRow
                  theme={theme}
                  department={department}
                  key={department.id}
                />
              );
            })}
          </tbody>
        </>
      );
    } else if (data && permission && type === TaskTypes.LEAVE) {
      const leaves = data as Array<LeaveType>;
      return (
        <>
          <LeaveHeader theme={theme} />
          <tbody>
            {leaves.map((leave) => {
              return <LeaveRow theme={theme} leave={leave} key={leave.id} />;
            })}
          </tbody>
        </>
      );
    } else if (data && permission && type === TaskTypes.PROJECT) {
      const projects = data as Array<ProjectType>;
      return (
        <>
          <ProjectHeader theme={theme} />
          <tbody>
            {projects.map((project) => {
              return (
                <ProjectRow theme={theme} project={project} key={project.id} />
              );
            })}
          </tbody>
        </>
      );
    } else if (data && type === TaskTypes.ROLE) {
      const roles = data as Array<RoleType>;
      return (
        <>
          <RoleHeader theme={theme} />
          <tbody>
            {roles.map((role) => {
              return <RoleRow theme={theme} role={role} key={role.id} />;
            })}
          </tbody>
        </>
      );
    } else if (data && permission && type === TaskTypes.TIMEREPORT) {
      const timereports = data as Array<Time_reportType>;
      return (
        <>
          <TimereportHeader theme={theme} />
          <tbody>
            {timereports.map((timereport) => {
              return (
                <TimereportRow
                  theme={theme}
                  timereport={timereport}
                  key={timereport.id}
                />
              );
            })}
          </tbody>
        </>
      );
    } else if (data && permission && type === TaskTypes.NOTICE) {
      const notices = data as Array<NoticeType>;
      return (
        <>
          <NoticeHeader theme={theme} />
          <tbody>
            {notices.map((notice) => {
              return (
                <NoticeRow theme={theme} notice={notice} key={notice.id} />
              );
            })}
          </tbody>
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <table
      className={`w-full border-spacing-5 hidden tablet:table table-fixed rounded-lg rounded-b-none ${
        theme === Theme.LIGHT ? 'shadow-lightShadow' : 'shadow-darkShadow'
      }`}
    >
      {renderTableContent()}
    </table>
  );
};
export default Table;
