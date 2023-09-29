import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../db';
import { body, validationResult } from 'express-validator';
enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}
import { PermissionType } from '../enums/enums';
import { protectRoutes } from '../utils/auth';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const postNewRole = async (
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
      const user = await prisma.role.create({
        data: {
          name: req.body.name,
        },
        include: {
          users: true,
        },
      });
      res.json({ data: user });
    } catch (e) {
      //P2002 unique constraint failed
      if (e.code === 'P2002') {
        e.type = ErrorTypes.INPUT;
      } else {
        e.type = ErrorTypes.SERVER;
      }
      next(e);
    }
  }
};
export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        users: true,
      },
    });
    res.json({ data: roles });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

export const updateRoleById = async (
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
      const role = await prisma.role.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
        },
        include: {
          users: true,
        },
      });
      res.json({ data: role });
    } catch (e) {
      //P2025 Record to update not found.
      //P2002 unique constraint failed
      if (e.code === 'P2025' || e.code === 'P2002') {
        e.type = ErrorTypes.INPUT;
      } else {
        e.type = ErrorTypes.SERVER;
      }
      next(e);
    }
  }
};

export const deleteRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = await prisma.role.delete({
      where: {
        id: req.params.id,
      },
      include: {
        users: true,
      },
    });
    res.json({ data: role });
  } catch (e) {
    //P2025 Record to delete does not exist
    if (e.code === 'P2025') {
      e.type = ErrorTypes.INPUT;
    } else {
      e.type = ErrorTypes.SERVER;
    }
    next(e);
  }
};

router.get('/', protectRoutes(PermissionType.ADMIN), getAllRoles);
router.put(
  '/:id',
  body('name')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid name'),
  protectRoutes(PermissionType.ADMIN),
  updateRoleById
);
router.post(
  '/',
  body('name')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid name'),
  protectRoutes(PermissionType.ADMIN),
  postNewRole
);
router.delete('/:id', protectRoutes(PermissionType.ADMIN), deleteRoleById);

export default router;
