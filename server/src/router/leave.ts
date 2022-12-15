import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'get all leaves' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'get leave by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update leave by id' });
});

router.post('/', (req, res) => {
  res.json({ message: 'post leave' });
});
router.delete('/:id', (req, res) => {
  res.json({ message: 'delete leave by id' });
});
export default router;
