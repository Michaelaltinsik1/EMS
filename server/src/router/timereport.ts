import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../db';
import { validateStatus } from '../middleware/customMiddleware';
import { body, validationResult } from 'express-validator';
import { protectRoutes } from '../utils/auth';
import { PermissionType } from '../enums/enums';
enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}
const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const getAllTimeReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timeReports = await prisma.time_report.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            date_of_birth: true,
            id: true,
            role: true,
            projects: true,
          },
        },
      },
    });

    res.json({ data: timeReports });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

export const getTimeReportsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timeReports = await prisma.time_report.findMany({
      where: {
        userId: req.params.userId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            date_of_birth: true,
            id: true,
            role: true,
            projects: true,
          },
        },
      },
    });
    res.json({ data: timeReports });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

export const updateTimeReportById = async (
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
      const timeReport = await prisma.time_report.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: req.body.status,
        },
      });
      res.json({ data: timeReport });
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

export const postNewTimeReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    try {
      const timeReport = await prisma.time_report.create({
        data: {
          from: req.body.from,
          to: req.body.to,
          userId: req.params.userId,
        },
      });
      res.json({ data: timeReport });
    } catch (e) {
      e.type = ErrorTypes.SERVER;
      next(e);
    }
  }
};

export const deleteTimeReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timeReport = await prisma.time_report.delete({
      where: { id: req.params.id },
    });
    res.json({ data: timeReport });
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

router.get('/', protectRoutes(PermissionType.ADMIN), getAllTimeReports);
router.get(
  '/users/:userId',
  protectRoutes(PermissionType.EMPLOYEE),
  getTimeReportsByUserId
);
router.put(
  '/:id',
  validateStatus,
  protectRoutes(PermissionType.ADMIN),
  updateTimeReportById
);
router.post(
  '/users/:userId',
  body('to').isISO8601().toDate().withMessage('Invalid To date'),
  body('from').isISO8601().toDate().withMessage('Invalid From date'),
  protectRoutes(PermissionType.EMPLOYEE),
  postNewTimeReport
);
router.delete('/:id', protectRoutes(PermissionType.ADMIN), deleteTimeReport);

export default router;
