import { Request, Response, Router } from 'express';
import prisma from '../db';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

//Validate name and budget, check name is string and not empty and thay budget is an number
export const createNewDepartment = async (req: Request, res: Response) => {
  const department = await prisma.department.create({
    data: {
      name: req.body.name,
      budget: req.body.budget,
    },
    include: {
      users: true,
      addresses: true,
    },
  });
  res.json({ data: department });
};
export const getAllDepartments = async (req: Request, res: Response) => {
  const departments = await prisma.department.findMany({
    include: {
      users: true,
      addresses: true,
    },
  });
  res.json({ data: departments });
};

export const updateDepartmentById = async (req: Request, res: Response) => {
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
};

export const deleteDepartmentById = async (req: Request, res: Response) => {
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
};

router.get('/', getAllDepartments);
router.put('/:id', updateDepartmentById);
router.post('/', createNewDepartment);
router.delete('/:id', deleteDepartmentById);

// router.post('/', (req, res) => {
//   res.json({ message: 'post department' });
// });

// router.get('/:id', (req, res) => {
//   res.json({ message: 'get department by id' });
// });
export default router;
