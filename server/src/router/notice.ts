import { Request, Response, Router } from 'express';
import prisma from '../db';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const getAllNotices = async (req: Request, res: Response) => {
  const notices = await prisma.notice.findMany();
  res.json({ data: notices });
};
export const getUserNoticeById = async (req: Request, res: Response) => {
  const notice = await prisma.notice.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: notice });
};

export const updateNoticeById = async (req: Request, res: Response) => {
  const notice = await prisma.notice.update({
    where: {
      id: req.params.id,
    },
    data: {
      status: req.body.status,
    },
  });
  res.json({ data: notice });
};

export const postNewNotice = async (req: Request, res: Response) => {
  const notice = await prisma.notice.create({
    data: {
      description: req.body.description,
      userId: req.params.userId,
    },
  });
  res.json({ data: notice });
};

export const deleteNotice = async (req: Request, res: Response) => {
  const notice = await prisma.notice.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: notice });
};
router.get('/', getAllNotices);
router.get('/:id', getUserNoticeById);
router.put('/:id', updateNoticeById);
router.post('/', postNewNotice);
router.delete('/:id', deleteNotice);

export default router;
