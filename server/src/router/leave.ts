import { Request, Response, Router } from 'express';
import prisma from '../db';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const getAllLeaves = async (req: Request, res: Response) => {
  const leaves = await prisma.leave.findMany();
  res.json({ data: leaves });
};
export const getLeavesByUserId = async (req: Request, res: Response) => {
  const leaves = await prisma.leave.findMany({
    where: {
      userId: req.params.userId,
    },
  });
  res.json({ data: leaves });
};
export const updateLeaveById = async (req: Request, res: Response) => {
  const leave = await prisma.leave.update({
    where: {
      id: req.params.id,
    },
    data: {
      status: req.body.status,
    },
  });
  res.json({ data: leave });
};
export const postNewLeave = async (req: Request, res: Response) => {
  const leave = await prisma.leave.create({
    data: {
      type_of_leave: req.body.type_of_leave,
      from: req.body.from,
      to: req.body.to,
      userId: req.params.userId,
    },
  });
  res.json({ data: leave });
};
export const deleteLeaveById = async (req: Request, res: Response) => {
  const leave = await prisma.leave.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: leave });
};

router.get('/admin', getAllLeaves);

router.get('/', getLeavesByUserId);

router.put('/:id', updateLeaveById);

router.post('/', postNewLeave);

router.delete('/:id', deleteLeaveById);

export default router;
