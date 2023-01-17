import { Request, Response, Router } from 'express';
import prisma from '../db';
import { body, validationResult } from 'express-validator';

enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}
const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const postNewProject = async (req: Request, res: Response) => {
  const project = await prisma.project.create({
    data: {
      name: req.body.name,
      start_date: req.body.start_date,
      deadline: req.body.deadline,
      description: req.body.description,
      // users: req.body.users,
    },
  });
  res.json({ data: project });
};

export const getAllProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: {
      users: true,
    },
  });
  res.json({ data: projects });
};

export const updateProjectById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    const project = await prisma.project.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        start_date: req.body.start_date,
        deadline: req.body.deadline,
        description: req.body.description,
      },
    });
    res.json({ data: project });
  }
};

export const addEmployeeToProject = async (req: Request, res: Response) => {
  console.log(req.params.userId);
  const project = await prisma.project.update({
    where: {
      id: req.params.id,
    },
    data: {
      users: {
        connect: {
          id: req.params.userId,
        },
      },
    },
  });

  res.json({ data: project });
};

export const deleteProjectById = async (req: Request, res: Response) => {
  const project = prisma.project.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: project });
};

// export const getProjectWithEmployee = async (req, res) => {
//   const projects = await prisma.project.findMany({
//     where:{
//       users
//     }
//   });
// };

router.get('/', getAllProjects);
router.put(
  '/:id',
  body('name')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid name'),
  body('start_date').isISO8601().toDate().withMessage('Invalid start date'),
  body('deadline').isISO8601().toDate().withMessage('Invalid deadline'),
  body('description')
    .isString()
    .optional()
    .isLength({ max: 1020 })
    .withMessage('Invalid description'),
  updateProjectById
);
router.put('/:id/addemployee', addEmployeeToProject);
router.post(
  '/',
  body('name')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid name'),
  body('start_date').isISO8601().toDate().withMessage('Invalid start date'),
  body('deadline').isISO8601().toDate().withMessage('Invalid deadline'),
  body('description')
    .isString()
    .optional()
    .isLength({ max: 1020 })
    .withMessage('Invalid description'),
  postNewProject
);
router.delete('/:id', deleteProjectById);

export default router;
