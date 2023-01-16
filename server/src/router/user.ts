import { Request, Response, Router } from 'express';
import prisma from '../db';
import { comparePassword, createJWT, hashPassword } from '../utils/auth';
import { body, validationResult } from 'express-validator';
import { validatePermission } from '../middleware/customMiddleware';
const router = Router();

export const createNewUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || req.body.errors) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
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
        notice: req.body.notice,
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
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      projects: true,
      time_reports: true,
      leaves: true,
      addresses: true,
    },
  });
  res.json({ data: users });
};

//Check if email is string and not empty
export const signIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
    include: {
      projects: true,
      time_reports: true,
      leaves: true,
      addresses: true,
    },
  });
  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ error: 'Password is invalid' });
    return;
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {}; //maybe not needed signin?

export const updateUserById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || req.body.errors) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
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
          update: {
            where: {
              id: req.body.addressId,
            },
            data: {
              country: req.body.country,
              city: req.body.city,
              zip: req.body.zip,
            },
          },
        },
      },
    });
    res.json({ data: user });
  }
};

export const connectExisitingAddress = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
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
  }
};

//Check that id is string and not empty
export const deleteUserById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    const user = prisma.user.delete({
      where: {
        id: req.body.id,
      },
    });
    res.json({ data: user });
  }
};

router.get('/', getAllUsers);
router.get('/:id', (req, res) => {
  res.json({ message: 'get user by id' });
});
router.put(
  '/',
  body('id').isUUID().withMessage('Invalid id'),
  body('firstName')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Invalid first name'),
  body('lastName')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Invalid last name'),
  body('salary').isInt().withMessage('Invalid salary'),
  body('date_of_birth').isISO8601().toDate().withMessage('Invalid To date'),
  body('roleId').isUUID().withMessage('Invalid id'),
  body('departmentId').isUUID().withMessage('Invalid id'),
  body('addressId').isUUID().withMessage('Invalid id'),
  body('country')
    .isString()
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 characters long'),
  body('city')
    .isString()
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 characters long'),
  body('zip')
    .isString()
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 characters long'),
  validatePermission,
  updateUserById
);
router.put(
  '/connect',
  body('id').isUUID().withMessage('Invalid id'),
  body('addressId').isUUID().withMessage('Invalid id'),
  connectExisitingAddress
);
router.post(
  '/',
  body('id').isUUID().withMessage('Invalid id'),
  body('firstName')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Invalid first name'),
  body('lastName')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Invalid last name'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isStrongPassword()
    .withMessage(
      'Invalid password. Requires minimum of 8 characters, minimum 1 lowercase, minimum 1 uppercase, minimum 1 special character '
    ),
  body('salary').isInt().withMessage('Invalid salary'),
  body('roleId').isUUID().withMessage('Invalid id'),
  body('notice').optional().isUUID().withMessage('Invalid id'),
  body('departmentId').isUUID().withMessage('Invalid id'),
  body('country').isString().isLength({ min: 2 }).withMessage('Invalid input'),
  body('city').isString().isLength({ min: 2 }).withMessage('Invalid input'),
  body('zip').isString().isLength({ min: 2 }).withMessage('Invalid input'),
  validatePermission,
  createNewUser
);
router.delete(
  '/:id',
  body('id').isUUID().withMessage('Invalid id'),
  deleteUserById
);
export default router;
