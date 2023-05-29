import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
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
      return (
        <>
          <EmployeeHeader theme={theme} />
          {data.map((user) => {
            return <EmployeeRow theme={theme} user={user as UserType} />;
          })}
        </>
      );
    } else if (data && type === TaskTypes.DEPARTMENT) {
      return (
        <>
          <DepartmentHeader theme={theme} />
          {data.map((department) => {
            return (
              <DepartmentRow
                theme={theme}
                department={department as DepartmentType}
              />
            );
          })}
        </>
      );
    } else if (data && permission && type === TaskTypes.LEAVE) {
      return (
        <>
          <LeaveHeader theme={theme} />
          {data.map((leave) => {
            return <LeaveRow theme={theme} leave={leave as LeaveType} />;
          })}
        </>
      );
    } else if (data && permission && type === TaskTypes.PROJECT) {
      return (
        <>
          <ProjectHeader theme={theme} />
          {data.map((project) => {
            return (
              <ProjectRow theme={theme} project={project as ProjectType} />
            );
          })}
        </>
      );
    } else if (data && type === TaskTypes.ROLE) {
      return (
        <>
          <RoleHeader theme={theme} />
          {data.map((role) => {
            return <RoleRow theme={theme} role={role as RoleType} />;
          })}
        </>
      );
    } else if (data && permission && type === TaskTypes.TIMEREPORT) {
      return (
        <>
          <TimereportHeader theme={theme} />
          {data.map((timereport) => {
            return (
              <TimereportRow
                theme={theme}
                timereport={timereport as Time_reportType}
              />
            );
          })}
        </>
      );
    } else if (data && permission && type === TaskTypes.NOTICE) {
      return (
        <>
          <NoticeHeader theme={theme} />
          {data.map((notice) => {
            return <NoticeRow theme={theme} notice={notice as NoticeType} />;
          })}
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
