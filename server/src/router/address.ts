import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { body, validationResult } from 'express-validator';
const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file
import { protectRoutes } from '../utils/auth';
import { PermissionType } from '../enums/enums';

enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}

export const getAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = await prisma.address.findMany({
      include: {
        Users: true,
      },
    });
    res.json({ data: address });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

export const getAddressById = async (
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
      const address = await prisma.address.findUnique({
        where: {
          id: req.body.id,
        },
      });
      res.json({ data: address });
    } catch (e) {
      e.type = ErrorTypes.SERVER;
      next(e);
    }
  }
};

export const postNewAddress = async (
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
      const address = await prisma.address.create({
        data: {
          country: req.body.country,
          city: req.body.city,
          zip: req.body.zip,
        },
        include: {
          department: true,
          Users: true,
        },
      });
      res.json({ data: address });
    } catch (e) {
      e.type = ErrorTypes.SERVER;
      next(e);
    }
  }
};

export const updateUserAddressById = async (
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
      const address = await prisma.address.update({
        where: {
          id: req.body.id,
        },
        data: {
          country: req.body.country,
          city: req.body.city,
          zip: req.body.zip,
        },
      });
      res.json({ data: address });
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

export const deleteAddress = async (
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
      const address = await prisma.address.delete({
        where: {
          id: req.body.id,
        },
      });
      res.json({ data: address });
    } catch (e) {
      //Record to delete does not exist
      if (e.code === 'P2025') {
        e.type = ErrorTypes.INPUT;
      } else {
        e.type = ErrorTypes.SERVER;
      }
      next(e);
    }
  }
};

router.get('/', protectRoutes(PermissionType.ADMIN), getAddresses);
router.get(
  '/getAddressById',
  body('id').isUUID().withMessage('Invalid id'),
  protectRoutes(PermissionType.ADMIN),
  getAddressById
);
router.put(
  '/',
  body('id').isUUID().withMessage('Invalid id'),
  body('country')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  body('city')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  body('zip')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  protectRoutes(PermissionType.EMPLOYEE),
  updateUserAddressById
);
router.post(
  '/',
  body('country')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  body('city')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  body('zip')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  protectRoutes(PermissionType.ADMIN),
  postNewAddress
);
router.delete(
  '/',
  body('id').isUUID().withMessage('Invalid id'),
  protectRoutes(PermissionType.ADMIN),
  deleteAddress
);

export default router;
