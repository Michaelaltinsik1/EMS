import { Router, Request, Response } from 'express';
import prisma from '../db';
import { body, validationResult } from 'express-validator';
const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

export const getAddresses = async (req: Request, res: Response) => {
  const address = await prisma.address.findMany({
    include: {
      Users: true,
    },
  });

  res.json({ data: address });
};

export const getAddressById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
    const address = await prisma.address.findUnique({
      where: {
        id: req.body.id,
      },
    });
    res.json({ data: address });
  }
};

export const postNewAddress = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
    const address = await prisma.address.create({
      data: {
        country: req.body.country,
        city: req.body.city,
        zip: req.body.zip,
      },
      include: {
        department: true,
        Users: true,
      },
    });
    res.json({ data: address });
  }
};

export const updateUserAddressById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
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
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    let errorMessages = errors.array();
    if (req.body.errors) {
      errorMessages.push(req.body.errors);
    }
    res.json({ errors: errorMessages });
  } else {
    const address = await prisma.address.delete({
      where: {
        id: req.body.id,
      },
    });
    res.json({ data: address });
  }
};

router.get('/', getAddresses);
router.get(
  '/:id',
  body('id').isUUID().withMessage('Invalid id'),
  getAddressById
);
router.put(
  '/',
  body('id').isUUID().withMessage('Invalid id'),
  body('country')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  body('city')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  body('zip')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  updateUserAddressById
);
router.post(
  '/',
  body('country')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  body('city')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  body('zip')
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Invalid input'),
  postNewAddress
);
router.delete(
  '/',
  body('id').isUUID().withMessage('Invalid id'),
  deleteAddress
);

export default router;
