import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../db';
import {
  comparePassword,
  createJWT,
  hashPassword,
  protectRoutes,
} from '../utils/auth';
import { body, validationResult } from 'express-validator';
import { validatePermission } from '../middleware/customMiddleware';
import { PermissionType } from '../enums/enums';
import { Prisma } from '@prisma/client';
enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}
const router = Router();

export const createNewUser = async (
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
      const user = await prisma.user.create({
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: await hashPassword(req.body.password),
          salary: req.body.salary,
          permission: req.body.permission,
          date_of_birth: req.body.date_of_birth,
          roleId: req.body.roleId,
          departmentId: req.body.departmentId,
          addresses: {
            create: {
              country: req.body.country,
              city: req.body.city,
              zip: req.body.zip,
            },
          },
        },
        include: {
          projects: true,
          time_reports: true,
          leaves: true,
          addresses: true,
        },
      });
      const token = createJWT(user);
      res.json({ token });
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

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        projects: true,
        time_reports: true,
        leaves: true,
        addresses: true,
        role: {
          select: {
            name: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({ data: users });
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

//Check if email is string and not empty
// export const signIn = async (req: Request, res: Response) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: req.body.email,
//     },
//     include: {
//       projects: true,
//       time_reports: true,
//       leaves: true,
//       addresses: true,
//     },
//   });
//   const isValid = await comparePassword(req.body.password, user.password);
//   if (!isValid) {
//     res.status(401);
//     res.json({ error: 'Password is invalid' });
//     return;
//   }
// };

//export const getUserByEmail = async (req: Request, res: Response) => {}; //maybe not needed signin?

export const updateUserById = async (
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
      const user = await prisma.user.update({
        where: {
          id: req.body.id,
        },
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          salary: req.body.salary,
          permission: req.body.permission,
          roleId: req.body.roleId,
          departmentId: req.body.departmentId,
          addresses: {
            upsert: {
              where: {
                id: req.body.addressId,
              },
              create: {
                country: req.body.country,
                city: req.body.city,
                zip: req.body.zip,
                id: req.params.id,
              },
              update: {
                country: req.body.country,
                city: req.body.city,
                zip: req.body.zip,
                id: req.params.id,
              },
            },
          },
          // addresses: {
          //   update: {
          //     where: {
          //       id: req.body.addressId,
          //     },
          //     data: {
          //       country: req.body.country,
          //       city: req.body.city,
          //       zip: req.body.zip,
          //     },
          //   },
          // },
        },
      });
      res.json({ data: user });
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

export const connectExisitingAddress = async (
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
      const user = await prisma.user.update({
        where: {
          id: req.body.id,
        },
        data: {
          addresses: {
            connect: { id: req.body.addressId },
          },
        },
        include: {
          addresses: true,
        },
      });
      res.json({ data: user });
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

//Check that id is string and not empty
export const deleteUserById = async (
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
      const user = await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });
      res.json({ data: user });
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

export const changePassword = async (
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
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
      });
      let isMatch = await comparePassword(
        req.body.currentPassword,
        user.password
      );
      if (isMatch) {
        const updatedUser = await prisma.user.update({
          where: {
            id: req.params.id,
          },
          data: {
            password: await hashPassword(req.body.newPassword),
          },
        });
        res.json({ data: updatedUser });
      } else {
        res.json({ errors: 'Invalid password' });
      }
    } catch (e) {
      //Record to update does not exist
      if (e.code === 'P2025') {
        e.type = ErrorTypes.INPUT;
      } else {
        e.type = ErrorTypes.SERVER;
      }
      next(e);
    }
  }
};

export const getProjectsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await prisma.user.findUnique({
      where: {
        id: req.params.userId,
      },
      include: {
        projects: true,
      },
    });
    if (projects) {
      res.json({ data: projects?.projects });
    } else {
      res.json({ data: null });
    }
  } catch (e) {
    e.type = ErrorTypes.SERVER;
    next(e);
  }
};

router.get('/', protectRoutes(PermissionType.ADMIN), getAllUsers);
router.get(
  '/:userId',
  protectRoutes(PermissionType.EMPLOYEE),
  getProjectsByUserId
);
router.put(
  '/',
  body('id').isUUID().withMessage('Invalid id'),
  body('firstName')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Invalid first name'),
  body('lastName')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Invalid last name'),
  body('salary').isInt().withMessage('Invalid salary'),
  // body('date_of_birth')
  //   .isString()
  //   .isLength({ min: 10, max: 40 })
  //   .withMessage('Invalid To date'),
  body('roleId').isUUID().withMessage('Invalid id'),
  body('departmentId').isUUID().withMessage('Invalid id'),
  // body('addressId').isUUID().withMessage('Invalid id'),
  body('country')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Must be at least 2 characters long'),
  body('city')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Must be at least 2 characters long'),
  body('zip')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Must be at least 2 characters long'),
  validatePermission,
  protectRoutes(PermissionType.ADMIN),
  updateUserById
);
router.put(
  '/connect',
  body('id').isUUID().withMessage('Invalid id'),
  body('addressId').isUUID().withMessage('Invalid id'),
  protectRoutes(PermissionType.EMPLOYEE),
  connectExisitingAddress
);

router.put(
  '/:id/change-password',
  body('currentPassword')
    .isStrongPassword()
    .isLength({ max: 255 })
    .withMessage(
      'Invalid password. Requires minimum of 8 characters, minimum 1 lowercase, minimum 1 uppercase, minimum 1 special character '
    ),
  body('newPassword')
    .isStrongPassword()
    .isLength({ max: 255 })
    .withMessage(
      'Invalid password. Requires minimum of 8 characters, minimum 1 lowercase, minimum 1 uppercase, minimum 1 special character '
    ),
  protectRoutes(PermissionType.EMPLOYEE),
  changePassword
);

router.post(
  '/',
  // body('id').isUUID().withMessage('Invalid id'),
  body('firstName')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Invalid first name'),
  body('lastName')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Invalid last name'),
  body('email').isEmail().isLength({ max: 255 }).withMessage('Invalid email'),
  body('password')
    .isStrongPassword()
    .isLength({ max: 255 })
    .withMessage(
      'Invalid password. Requires minimum of 8 characters, minimum 1 lowercase, minimum 1 uppercase, minimum 1 special character '
    ),
  body('date_of_birth')
    .isString()
    .isLength({ min: 10, max: 40 })
    .withMessage('Invalid date of birth'),
  body('salary').isInt().withMessage('Invalid salary'),
  body('roleId').optional().isUUID().withMessage('Invalid id'),
  body('notice').optional().isUUID().withMessage('Invalid id'),
  body('departmentId').optional().isUUID().withMessage('Invalid id'),
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
  validatePermission,
  protectRoutes(PermissionType.ADMIN),
  createNewUser
);
router.delete('/:id', protectRoutes(PermissionType.ADMIN), deleteUserById);

export default router;
