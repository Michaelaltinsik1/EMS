import { NextFunction, Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../db';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}
//Validate name and budget, check name is string and not empty and thay budget is an number
export const createNewDepartment = async (
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
      const department = await prisma.department.create({
        data: {
          name: req.body.name,
          budget: Number(req.body.budget),
        },
        include: {
          users: true,
          addresses: true,
        },
      });
      res.json({ data: department });
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
export const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        users: true,
        addresses: true,
      },
    });
    res.json({ data: departments });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

/**
 * Might need validation for address change
 */
export const updateDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
    try {
      const department = await prisma.department.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          budget: req.body.budget,
          addresses: req.body.addresses,
        },
        include: {
          users: true,
          addresses: true,
        },
      });
      res.json({ data: department });
    } catch (e) {
      //P2025 Record to update not found.
      if (e.code === 'P2025') {
        e.type = ErrorTypes.INPUT;
      } else {
        e.type = ErrorTypes.SERVER;
      }
      next(e);
    }
  }
};

export const deleteDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await prisma.department.delete({
      where: {
        id: req.params.id,
      },
      include: {
        users: true,
        addresses: true,
      },
    });
    res.json({ data: department });
  } catch (e) {
    console.log(e);
    //Record to delete does not exist
    if (e.code === 'P2025') {
      e.type = ErrorTypes.INPUT;
    } else {
      e.type = ErrorTypes.SERVER;
    }
    next(e);
  }
};

router.get('/', getAllDepartments);

router.put(
  '/:id',
  body('name')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid name'),
  body('budget').isInt().withMessage('Invalid budget'),
  updateDepartmentById
);
router.post(
  '/',
  body('name')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid name'),
  body('budget').isInt().withMessage('Invalid budget'),
  createNewDepartment
);
router.delete('/:id', deleteDepartmentById);

// router.post('/', (req, res) => {
//   res.json({ message: 'post department' });
// });

// router.get('/:id', (req, res) => {
//   res.json({ message: 'get department by id' });
// });
export default router;
