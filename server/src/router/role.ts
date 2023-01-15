import { Request, Response, Router } from 'express';
import prisma from '../db';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const postNewRole = async (req: Request, res: Response) => {
  const user = await prisma.role.create({
    data: {
      name: req.body.name,
    },
    include: {
      users: true,
    },
  });
  res.json({ data: user });
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

// router.get('/:id', (req, res) => {
//   res.json({ message: 'get role by id' });
// });
router.put('/:id', updateRoleById);

router.post('/', postNewRole);
router.delete('/:id', deleteRoleById);
export default router;
