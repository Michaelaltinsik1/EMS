import { Router, Request, Response } from 'express';
import prisma from '../db';
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
  const address = await prisma.address.findUnique({
    where: {
      id: req.body.id,
    },
  });
  res.json({ data: address });
};

export const postNewAddress = async (req: Request, res: Response) => {
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
};

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

export const deleteAddress = async (req: Request, res: Response) => {
  const address = await prisma.address.delete({
    where: {
      id: req.body.id,
    },
  });
  res.json({ data: address });
};

router.get('/', getAddresses);
router.get('/:id', getAddressById);
router.put('/', updateUserAddressById);
router.post('/', postNewAddress);
router.delete('/:id', deleteAddress);

export default router;
