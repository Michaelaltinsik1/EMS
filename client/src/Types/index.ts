//Prisma generated types
// import {
//   User,
//   Notice,
//   Project,
//   Address,
//   Department,
//   Time_report,
//   Role,
//   Leave,
//   Permission,
//   Status,
//   Type_of_leave,
// } from 'src/../../server/node_modules/.prisma/client/index';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salary: number;
  permission: Permission;
  date_of_birth: string;
  created_at: Date;
  updated_at: Date;
  roleId: string | null;
  departmentId: string | null;
};
type Notice = {
  id: string;
  created_at: Date;
  description: string | null;
  status: Status;
  userId: string;
};
type Project = {
  id: string;
  name: string;
  created_at: Date;
  start_date: Date;
  deadline: Date;
  description: string | null;
};
type Address = {
  id: string;
  country: string;
  city: string;
  zip: string;
  street: string | null;
  departmentId: string | null;
};
type Department = {
  id: string;
  name: string;
  budget: number;
  created_at: Date;
};
type Time_report = {
  id: string;
  created_at: Date;
  from: Date;
  to: Date;
  status: Status;
  userId: string;
};
type Role = {
  id: string;
  name: string;
  created_at: Date;
};
type Leave = {
  id: string;
  type_of_leave: Type_of_leave;
  created_at: Date;
  from: Date;
  to: Date;
  status: Status;
  userId: string;
};
type Permission = 'ADMIN' | 'EMPLOYEE';
type Status = 'ACCEPTED' | 'PENDING' | 'REJECTED';
type Type_of_leave =
  | 'SICK_LEAVE'
  | 'ANNUAL_LEAVE'
  | 'MATERNITY_LEAVE'
  | 'PATERNITY_LEAVE'
  | 'COMPENSATORY_LEAVE'
  | 'UNPAID_LEAVE';
type UserIncludeTypes = {
  role?: {
    name?: string;
  };
  department?: {
    name?: string;
  };
  addresses?: Array<{
    id: string;
    zip?: string;
    city?: string;
    country?: string;
    street?: string;
  }>;
};

type DepartmentIncludeTypes = {
  addresses?: {
    id: string;
    country: string;
    city: string;
    zip: string;
    street?: string;
    departmentId?: string;
  };
};
type LeaveIncludeTypes = {
  user: {
    firstName: string;
    lastName: string;
    date_of_birth: string;
    role?: {
      name: string;
    };
  };
};
type TimereportIncludeTypes = {
  user: {
    firstName: string;
    lastName: string;
    date_of_birth: string;
    role?: {
      name: string;
    };
    projects: Array<{
      name: string;
    }>;
  };
};

type NoticeIncludeTypes = {
  user: {
    firstName: string;
    lastName: string;
    date_of_birth: string;
    role: {
      name: string;
    };
  };
};

export type UserType = User & UserIncludeTypes;
export type NoticeType = Notice & NoticeIncludeTypes;
export type ProjectType = Project;
export type AddressType = Address;
export type DepartmentType = Department & DepartmentIncludeTypes;
export type Time_reportType = Time_report & TimereportIncludeTypes;
export type RoleType = Role;
export type LeaveType = Leave & LeaveIncludeTypes;
export type PermissionType = Permission;
export type StatusType = Status;
export type Type_of_leaveType = Type_of_leave;
