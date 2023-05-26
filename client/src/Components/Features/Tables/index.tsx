import { useContext, useEffect, useState } from 'react';
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

interface CardProps {
  users?: Array<UserType>;
  leaves?: Array<LeaveType>;
  departments?: Array<DepartmentType>;
  projects?: Array<ProjectType>;
  roles?: Array<RoleType>;
  timereports?: Array<Time_reportType>;
  notices?: Array<NoticeType>;
  permission?: PermissionType;
}
const Table = ({
  users,
  leaves,
  departments,
  projects,
  roles,
  timereports,
  notices,
  permission,
}: CardProps) => {
  const { theme } = useContext(ThemeContext);
  const {
    isTablet,
    isTabletEdgeCase,
    isDesktop,
    isDesktopEdgeCaseBreakpoint,
    isXLDesktop,
  } = useBreakpoint();
  const renderTableContent = () => {
    if (users) {
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
          {users.map((user) => {
            return <EmployeeRow theme={theme} user={user} />;
          })}
        </>
      );
    } else if (departments) {
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
          {departments.map((department) => {
            return <DepartmentRow theme={theme} department={department} />;
          })}
        </>
      );
    } else if (leaves && permission) {
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
          {leaves.map((leave) => {
            return <LeaveRow theme={theme} leave={leave} />;
          })}
        </>
      );
    } else if (projects && permission) {
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
          {projects.map((project) => {
            return <ProjectRow theme={theme} project={project} />;
          })}
        </>
      );
    } else if (roles) {
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
          {roles.map((role) => {
            return <RoleRow theme={theme} role={role} />;
          })}
        </>
      );
    } else if (timereports && permission) {
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
          {timereports.map((timereport) => {
            return <TimereportRow theme={theme} timereport={timereport} />;
          })}
        </>
      );
    } else if (notices && permission) {
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
          {notices.map((notice) => {
            return <NoticeRow theme={theme} notice={notice} />;
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
