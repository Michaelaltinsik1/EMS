import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import { Theme } from 'src/Types/enums';
import EmployeeRow from './EmployeeRow';
import DepartmentRow from './DepartmentRow';
import TableItem from 'src/Components/Base/TableItem';

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
import LeaveRow from './LeaveRow';
import ProjectRow from './ProjectRow';
import RoleRow from './RoleRow';
import TimereportRow from './TimereportRow';

import NoticeRow from './NoticeRow';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { TaskTypes } from 'src/utils/enum';
interface CardProps<T> {
  permission?: PermissionType;
  data?: Array<T>;
  type: TaskTypes;
}
const Table = <T extends unknown>({ permission, data, type }: CardProps<T>) => {
  const { theme } = useContext(ThemeContext);
  const { isTablet, isDesktop, isDesktopEdgeCaseBreakpoint } = useBreakpoint();
  const renderTableContent = () => {
    if (data && type === TaskTypes.USER) {
      return (
        <>
          <tr
            className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg  ${
              theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
            }`}
          >
            <TableItem type="tableHeader">Name</TableItem>
            <TableItem type="tableHeader">Role</TableItem>
            {!isTablet && (
              <TableItem type="tableHeader">Day of birth</TableItem>
            )}
            {isTablet ||
              (isDesktopEdgeCaseBreakpoint && isDesktop && (
                <TableItem type="tableHeader">Id</TableItem>
              ))}
            {!isTablet && <TableItem type="tableHeader">Email</TableItem>}
            {!isTablet && <TableItem type="tableHeader">Hire date</TableItem>}
            <TableItem type="tableHeader">Department</TableItem>
            {!isTablet && <TableItem type="tableHeader">Salary</TableItem>}
            <TableItem type="tableHeader">Permission</TableItem>
          </tr>
          {data.map((user) => {
            return <EmployeeRow theme={theme} user={user as UserType} />;
          })}
        </>
      );
    } else if (data && type === TaskTypes.DEPARTMENT) {
      return (
        <>
          <tr
            className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg ${
              theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
            }`}
          >
            <TableItem type="tableHeader">Name</TableItem>
            {!isTablet && <TableItem type="tableHeader">Id</TableItem>}
            <TableItem type="tableHeader">Budget</TableItem>
            <TableItem type="tableHeader">Created at</TableItem>
            <TableItem type="tableHeader">Address</TableItem>
          </tr>
          {data.map((department) => {
            console.log(department);
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
          <tr
            className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg ${
              theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
            }`}
          >
            <TableItem type="tableHeader">Name</TableItem>
            <TableItem type="tableHeader">Role</TableItem>
            <TableItem type="tableHeader">Day of birth</TableItem>
            {!isTablet && <TableItem type="tableHeader">Id</TableItem>}
            <TableItem type="tableHeader">Type of leave</TableItem>
            <TableItem type="tableHeader">To</TableItem>
            <TableItem type="tableHeader">From</TableItem>
            <TableItem type="tableHeader">Status</TableItem>
          </tr>
          {data.map((leave) => {
            return <LeaveRow theme={theme} leave={leave as LeaveType} />;
          })}
        </>
      );
    } else if (data && permission && type === TaskTypes.PROJECT) {
      return (
        <>
          <tr
            className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg ${
              theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
            }`}
          >
            <TableItem type="tableHeader">Name</TableItem>
            {!isTablet && <TableItem type="tableHeader">Id</TableItem>}
            <TableItem type="tableHeader">Created at</TableItem>
            <TableItem type="tableHeader">Deadline</TableItem>
            <TableItem type="tableHeader">Description</TableItem>
          </tr>
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
          <tr
            className={`[&>th]:py-4 border-b border-opacity-50 w-screen rounded-lg ${
              theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
            }`}
          >
            <TableItem type="tableHeader">Name</TableItem>
            <TableItem type="tableHeader">Id</TableItem>
            <TableItem type="tableHeader">Created at</TableItem>
          </tr>
          {data.map((role) => {
            return <RoleRow theme={theme} role={role as RoleType} />;
          })}
        </>
      );
    } else if (data && permission && type === TaskTypes.TIMEREPORT) {
      return (
        <>
          <tr
            className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg ${
              theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
            }`}
          >
            <TableItem type="tableHeader">Name</TableItem>
            <TableItem type="tableHeader">Role</TableItem>
            <TableItem type="tableHeader">Day of birth</TableItem>
            {!isTablet && <TableItem type="tableHeader">Id</TableItem>}
            <TableItem type="tableHeader">Project</TableItem>
            <TableItem type="tableHeader">Created at</TableItem>
            <TableItem type="tableHeader">From</TableItem>
            <TableItem type="tableHeader">To</TableItem>
            <TableItem type="tableHeader">Status</TableItem>
          </tr>
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
          <tr
            className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg ${
              theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
            }`}
          >
            <TableItem type="tableHeader">Name</TableItem>
            <TableItem type="tableHeader">Role</TableItem>
            <TableItem type="tableHeader">Day of birth</TableItem>
            {!isTablet && <TableItem type="tableHeader">Id</TableItem>}
            <TableItem type="tableHeader">Created at</TableItem>
            <TableItem type="tableHeader">Description</TableItem>
            <TableItem type="tableHeader">Status</TableItem>
          </tr>
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
