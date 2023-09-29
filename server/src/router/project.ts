import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../db';
import { body, validationResult } from 'express-validator';
import { PermissionType } from '../enums/enums';
import { protectRoutes } from '../utils/auth';

enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}
const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const postNewProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await prisma.project.create({
      data: {
        name: req.body.name,
        start_date: req.body.start_date,
        deadline: req.body.deadline,
        description: req.body.description,
      },
    });
    res.json({ data: project });
  } catch (e) {
    //P2002 unique constraint failed
    if (e.code === 'P2002') {
      e.type = ErrorTypes.INPUT;
    } else {
      e.type = ErrorTypes.SERVER;
    }
    next(e);
  }
};

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        users: true,
      },
    });
    res.json({ data: projects });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

export const updateProjectById = async (
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
      const project = await prisma.project.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          start_date: req.body.start_date,
          deadline: req.body.deadline,
          description: req.body.description,
        },
      });
      res.json({ data: project });
    } catch (e) {
      //P2025 Record to update not found.
      //P2002 unique constraint failed.
      if (e.code === 'P2025' || e.code === 'P2002') {
        e.type = ErrorTypes.INPUT;
      } else {
        e.type = ErrorTypes.SERVER;
      }
      next(e);
    }
  }
};

export const addEmployeeToProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await prisma.project.update({
      where: {
        id: req.params.id,
      },
      data: {
        users: {
          connect: {
            id: req.params.userId,
          },
        },
      },
    });

    res.json({ data: project });
  } catch (e) {
    //P2025 Record to update not found.
    if (e.code === 'P2025') {
      e.type = ErrorTypes.INPUT;
    } else {
      e.type = ErrorTypes.SERVER;
    }
    next(e);
  }
};

export const deleteProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = prisma.project.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: project });
  } catch (e) {
    //P2025 Record to delete not found.
    if (e.code === 'P2025') {
      e.type = ErrorTypes.INPUT;
    } else {
      e.type = ErrorTypes.SERVER;
    }
    next(e);
  }
};

export const getProjectsWithEmployeeID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        users: {
          some: {
            id: req.params.userId,
          },
        },
      },
    });
    res.json({ data: projects });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

/**
 * Create route to get all projects based on userId
 * with permission Employee
 */

router.get('/', protectRoutes(PermissionType.ADMIN), getAllProjects);
router.get(
  '/users/:userId',
  protectRoutes(PermissionType.EMPLOYEE),
  getProjectsWithEmployeeID
);

router.put(
  '/:id',
  body('name')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid name'),
  body('start_date').isISO8601().toDate().withMessage('Invalid start date'),
  body('deadline').isISO8601().toDate().withMessage('Invalid deadline'),
  body('description')
    .isString()
    .optional()
    .isLength({ max: 1020 })
    .withMessage('Invalid description'),
  protectRoutes(PermissionType.ADMIN),
  updateProjectById
);
router.put(
  '/:id/users/:userId',
  protectRoutes(PermissionType.ADMIN),
  addEmployeeToProject
);
router.post(
  '/',
  body('name')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid name'),
  body('start_date').isISO8601().toDate().withMessage('Invalid start date'),
  body('deadline').isISO8601().toDate().withMessage('Invalid deadline'),
  body('description')
    .isString()
    .optional()
    .isLength({ max: 1020 })
    .withMessage('Invalid description'),
  protectRoutes(PermissionType.ADMIN),
  postNewProject
);
router.delete('/:id', protectRoutes(PermissionType.ADMIN), deleteProjectById);

export default router;
