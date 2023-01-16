import { NextFunction, Request, Response } from 'express';

enum Status {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

enum Type_of_leave {
  SICK_LEAVE = 'SICK_LEAVE',
  ANNUAL_LEAVE = 'ANNUAL_LEAVE',
  MATERNITY_LEAVE = 'MATERNITY_LEAVE',
  PATERNITY_LEAVE = 'PATERNITY_LEAVE',
  COMPENSATORY_LEAVE = 'COMPENSATORY_LEAVE',
  UNPAID_LEAVE = 'UNPAID_LEAVE',
}
enum Permission {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}
export const validateStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Object.values(Status).includes(req.body.status)) {
  } else {
    req.body.errors = { msg: 'Invalid status', param: 'status' };
  }
  next();
};

export const validateLeaveType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Object.values(Type_of_leave).includes(req.body.type_of_leave)) {
  } else {
    req.body.errors = { msg: 'Invalid leave', param: 'type_of_leave' };
  }
  next();
};

export const validatePermission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Object.values(Permission).includes(req.body.permission)) {
  } else {
    req.body.errors = { msg: 'Invalid permission', param: 'permission' };
  }
  next();
};
