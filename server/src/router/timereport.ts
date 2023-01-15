import { Request, Response, Router } from 'express';
import prisma from '../db';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const getAllTimeReports = async (req: Request, res: Response) => {
  const timeReports = await prisma.time_report.findMany();

  res.json({ data: timeReports });
};

export const getTimeReportsByUserId = async (req: Request, res: Response) => {
  const timeReports = await prisma.time_report.findMany({
    where: {
      userId: req.params.userId,
    },
  });
  res.json({ data: timeReports });
};

export const updateTimeReportById = async (req: Request, res: Response) => {
  const timeReport = await prisma.time_report.update({
    where: {
      id: req.params.id,
    },
    data: {
      status: req.body.status,
    },
  });
  res.json({ data: timeReport });
};

export const postNewTimeReport = async (req: Request, res: Response) => {
  const timeReport = await prisma.time_report.create({
    data: {
      from: req.body.from,
      to: req.body.to,
      userId: req.params.userId,
    },
  });
  res.json({ data: timeReport });
};

export const deleteTimeReport = async (req: Request, res: Response) => {
  const timeReport = await prisma.time_report.delete({
    where: { id: req.params.id },
  });
  res.json({ data: timeReport });
};

router.get('/admin', getAllTimeReports);

router.get('/', getTimeReportsByUserId);

router.put('/:id', updateTimeReportById);

router.post('/', postNewTimeReport);

router.delete('/:id', deleteTimeReport);

export default router;
