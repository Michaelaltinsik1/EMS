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

export const getAllNotices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notices = await prisma.notice.findMany({
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
    res.json({ data: notices });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};
export const getUserNoticeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notice = await prisma.notice.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: notice });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};
export const getNoticeByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notice = await prisma.notice.findUnique({
      where: {
        userId: req.params.userId,
      },
    });
    res.json({ data: notice });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

export const updateNoticeById = async (
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
      const notice = await prisma.notice.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: req.body.status,
        },
      });
      res.json({ data: notice });
    } catch (e) {
      //P2025 Record to update does not exist
      if (e.code === 'P2025') {
        e.type = ErrorTypes.INPUT;
      } else {
        e.type = ErrorTypes.SERVER;
      }
      next(e);
    }
  }
};

export const postNewNotice = async (
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
      const notice = await prisma.notice.create({
        data: {
          description: req.body.description,
          userId: req.params.userId,
        },
      });
      res.json({ data: notice });
    } catch (e) {
      e.type = ErrorTypes.SERVER;
      next(e);
    }
  }
};

export const deleteNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notice = await prisma.notice.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: notice });
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
router.get('/', protectRoutes(PermissionType.ADMIN), getAllNotices);
router.get('/:id', protectRoutes(PermissionType.EMPLOYEE), getUserNoticeById);
router.get(
  '/users/:userId/',
  protectRoutes(PermissionType.EMPLOYEE),
  getNoticeByUserId
);
router.put(
  '/:id',
  validateStatus,
  protectRoutes(PermissionType.ADMIN),
  updateNoticeById
);
router.post(
  '/users/:userId',
  body('description').isString().withMessage('Invalid description'),
  protectRoutes(PermissionType.EMPLOYEE),
  postNewNotice
);
router.delete('/:id', protectRoutes(PermissionType.ADMIN), deleteNotice);

export default router;
