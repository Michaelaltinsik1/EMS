import e, { NextFunction, Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../db';
import {
  validateLeaveType,
  validateStatus,
} from '../middleware/customMiddleware';
import { protectRoutes } from '../utils/auth';
import { PermissionType } from '../enums/enums';
const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}

export const getAllLeaves = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leaves = await prisma.leave.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            date_of_birth: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.json({ data: leaves });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};
export const getLeavesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leaves = await prisma.leave.findMany({
      where: {
        userId: req.params.userId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            date_of_birth: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.json({ data: leaves });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};
export const updateLeaveById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorsToLog = {
    errors: [],
  };
  if (req.body.errors) {
    res.status(400);
    errorsToLog.errors.push(req.body.errors);
    res.json(errorsToLog);
  } else {
    try {
      const leave = await prisma.leave.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: req.body.status,
        },
      });
      res.json({ data: leave });
    } catch (e) {
      if (e.code === 'P2025') {
        e.type = ErrorTypes.INPUT;
      } else {
        e.type = ErrorTypes.SERVER;
      }
      next(e);
    }
  }
};
export const postNewLeave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || req.body.errors) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
    try {
      const leave = await prisma.leave.create({
        data: {
          type_of_leave: req.body.type_of_leave,
          from: req.body.from,
          to: req.body.to,
          userId: req.params.userId,
        },
      });
      res.json({ data: leave });
    } catch (e) {
      e.type = ErrorTypes.SERVER;
      next(e);
    }
  }
};
export const deleteLeaveById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leave = await prisma.leave.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: leave });
  } catch (e) {
    //Record to delete does not exist
    if (e.code === 'P2025') {
      e.type = ErrorTypes.INPUT;
    } else {
      e.type = ErrorTypes.SERVER;
    }
    next(e);
  }
};

router.get('/', protectRoutes(PermissionType.ADMIN), getAllLeaves);
router.get(
  '/users/:userId',
  protectRoutes(PermissionType.EMPLOYEE),
  getLeavesByUserId
);
router.put(
  '/:id',
  validateStatus,
  protectRoutes(PermissionType.ADMIN),
  updateLeaveById
);
router.post(
  '/users/:userId',
  body('to').isISO8601().toDate().withMessage('Invalid To date'),
  body('from').isISO8601().toDate().withMessage('Invalid From date'),
  validateLeaveType,
  protectRoutes(PermissionType.EMPLOYEE),
  postNewLeave
);
router.delete('/:id', protectRoutes(PermissionType.ADMIN), deleteLeaveById);

export default router;
