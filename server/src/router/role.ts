import { Request, Response, Router } from 'express';
import prisma from '../db';
import { body, validationResult } from 'express-validator';
const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const postNewRole = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    const user = await prisma.role.create({
      data: {
        name: req.body.name,
      },
      include: {
        users: true,
      },
    });
    res.json({ data: user });
  }
};
export const getAllRoles = async (req: Request, res: Response) => {
  const roles = await prisma.role.findMany({
    include: {
      users: true,
    },
  });
  res.json({ data: roles });
};

export const updateRoleById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
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
  }
};

export const deleteRoleById = async (req: Request, res: Response) => {
  const role = await prisma.role.delete({
    where: {
      id: req.params.id,
    },
    include: {
      users: true,
    },
  });
  res.json({ data: role });
};
// router.get('/', (req, res) => {
//   res.json({ message: 'get all role' });
// });
router.get('/', getAllRoles);
router.put(
  '/:id',
  body('name').isString().isLength({ min: 2 }).withMessage('Invalid name'),
  updateRoleById
);
router.post(
  '/',
  body('name').isString().isLength({ min: 2 }).withMessage('Invalid name'),
  postNewRole
);
router.delete('/:id', deleteRoleById);

// router.get('/:id', (req, res) => {
//   res.json({ message: 'get role by id' });
// });
export default router;
