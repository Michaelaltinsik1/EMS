import e, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../db';
import {
  validateLeaveType,
  validateStatus,
} from '../middleware/customMiddleware';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}
// router.use(validateStatus);

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
  let errorsToLog = {
    errors: [],
  };
  if (req.body.errors) {
    res.status(400);
    errorsToLog.errors.push(req.body.errors);
    res.json(errorsToLog);
  } else {
    const leave = await prisma.leave.update({
      where: {
        id: req.params.id,
      },
      data: {
        status: req.body.status,
      },
    });
    res.json({ data: leave });
  }
};
export const postNewLeave = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || req.body.errors) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
    const leave = await prisma.leave.create({
      data: {
        type_of_leave: req.body.type_of_leave,
        from: req.body.from,
        to: req.body.to,
        userId: req.params.userId,
      },
    });
    res.json({ data: leave });
  }
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
router.put('/:id', validateStatus, updateLeaveById);
router.post(
  '/',
  body('to').isISO8601().toDate().withMessage('Invalid To date'),
  body('from').isISO8601().toDate().withMessage('Invalid From date'),
  validateLeaveType,
  postNewLeave
);
router.delete('/:id', deleteLeaveById);

export default router;
