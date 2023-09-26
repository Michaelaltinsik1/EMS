import { createContext, useState, ReactNode } from 'react';
import {
  RoleType,
  DepartmentType,
  LeaveType,
  ProjectType,
  UserType,
  Time_reportType,
  NoticeType,
} from 'src/Types';

interface CacheContextProps {
  roles: Array<RoleType> | null;
  departments: Array<DepartmentType> | null;
  leaves: Array<LeaveType> | null;
  projects: Array<ProjectType> | null;
  employees: Array<UserType> | null;
  employee: UserType | null;
  timereports: Array<Time_reportType> | null;
  notices: Array<NoticeType> | null;
  updateRoles: (role: Array<RoleType> | null) => void;
  updateDepartments: (role: Array<DepartmentType> | null) => void;
  updateLeaves: (leaves: Array<LeaveType> | null) => void;
  updateProjects: (projects: Array<ProjectType> | null) => void;
  updateEmployee: (employee: UserType | null) => void;
  updateEmployees: (employees: Array<UserType> | null) => void;
  updateTimereports: (timereports: Array<Time_reportType> | null) => void;
  updateNotices: (notices: Array<NoticeType> | null) => void;
}

interface cacheProviderProps {
  children: ReactNode | ReactNode[];
}
export const CacheContext = createContext<CacheContextProps>({
  roles: null,
  departments: null,
  leaves: null,
  projects: null,
  employees: null,
  employee: null,
  timereports: null,
  notices: null,
  updateRoles: (role: Array<RoleType> | null) => {},
  updateDepartments: (departments: Array<DepartmentType> | null) => {},
  updateLeaves: (leaves: Array<LeaveType> | null) => {},
  updateProjects: (projects: Array<ProjectType> | null) => {},
  updateEmployees: (employees: Array<UserType> | null) => {},
  updateEmployee: (employee: UserType | null) => {},
  updateTimereports: (timereports: Array<Time_reportType> | null) => {},
  updateNotices: (notices: Array<NoticeType> | null) => {},
});

export const CacheProvider = ({ children }: cacheProviderProps) => {
  const [roles, setRole] = useState<Array<RoleType> | null>(null);
  const [departments, setDepartment] = useState<Array<DepartmentType> | null>(
    null
  );
  const [leaves, setLeaves] = useState<Array<LeaveType> | null>(null);
  const [projects, setProjects] = useState<Array<ProjectType> | null>(null);
  const [employees, setEmployees] = useState<Array<UserType> | null>(null);
  const [employee, setEmployee] = useState<UserType | null>(null);
  const [timereports, setTimereports] = useState<Array<Time_reportType> | null>(
    null
  );
  const [notices, setNotices] = useState<Array<NoticeType> | null>(null);

  const updateRoles = (roles: Array<RoleType> | null) => {
    setRole(roles);
  };
  const updateDepartments = (departments: Array<DepartmentType> | null) => {
    setDepartment(departments);
  };
  const updateLeaves = (leaves: Array<LeaveType> | null) => {
    setLeaves(leaves);
  };
  const updateProjects = (projects: Array<ProjectType> | null) => {
    setProjects(projects);
  };
  const updateEmployees = (employees: Array<UserType> | null) => {
    setEmployees(employees);
  };
  const updateTimereports = (timereports: Array<Time_reportType> | null) => {
    setTimereports(timereports);
  };
  const updateNotices = (notices: Array<NoticeType> | null) => {
    setNotices(notices);
  };
  const updateEmployee = (employee: UserType | null) => {
    setEmployee(employee);
  };
  return (
    <CacheContext.Provider
      value={{
        roles,
        updateRoles,
        departments,
        updateDepartments,
        leaves,
        updateLeaves,
        projects,
        updateProjects,
        employees,
        updateEmployees,
        timereports,
        updateTimereports,
        notices,
        updateNotices,
        employee,
        updateEmployee,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};
