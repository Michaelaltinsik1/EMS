import { Request, Response, Router } from 'express';
import prisma from '../db';
import { comparePassword, createJWT, hashPassword } from '../utils/auth';
const router = Router();

export const createNewUser = async (req: Request, res: Response) => {
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

export const getUserById = async (req: Request, res: Response) => {}; //maybe not needed signin?

export const updateUserAddressById = async (req: Request, res: Response) => {
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
};

export const updateUserById = async (req: Request, res: Response) => {
  const user = prisma.user.update({
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
    },
  });
  // const address = await prisma.address.update({
  //   const id = prisma.address.find

  //   where: {
  //     id: req.body.id,
  //   },
  //   data: {
  //     country: req.body.country,
  //     city: req.body.city,
  //     zip: req.body.zip,
  //   },
  // });
};

export const deleteUserById = async (req: Request, res: Response) => {
  const user = prisma.user.delete({
    where: {
      id: req.body.id,
    },
  });
  res.json({ data: user });
};

router.get('/', getAllUsers);
router.get('/:id', (req, res) => {
  res.json({ message: 'get user by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update user by id' });
});
router.post('/', createNewUser);

router.delete('/:id', (req, res) => {
  res.json({ message: 'delete user by id' });
});
export default router;
