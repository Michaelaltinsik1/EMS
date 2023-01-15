import { Router } from 'express';

const router = Router({ mergeParams: true }); //merges the url => makes sure you can access the userid params in server.ts on this file

router.get('/', (req, res) => {
  res.json({ message: 'get all addresses' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'get address by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update address by id' });
});

router.post('/', (req, res) => {
  res.json({ message: 'post address' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'delete address by id' });
});

export default router;
