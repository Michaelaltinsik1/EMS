//Prisma generated types
import {
  User,
  Notice,
  Project,
  Address,
  Department,
  Time_report,
  Role,
  Leave,
  Permission,
  Status,
  Type_of_leave,
} from 'src/../../server/node_modules/.prisma/client/index';

type UserIncludeTypes = {
  role?: {
    name?: string;
  };
  department?: {
    name?: string;
  };
};

type DepartmentIncludeTypes = {
  addresses?: {
    id: string;
    country: string;
    city: string;
    zip: string;
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
