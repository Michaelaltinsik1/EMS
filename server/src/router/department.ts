import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'get all department' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'get department by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update department by id' });
});

router.post('/', (req, res) => {
  res.json({ message: 'post department' });
});
router.delete('/:id', (req, res) => {
  res.json({ message: 'delete department by id' });
});
export default router;
