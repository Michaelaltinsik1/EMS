import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'get all role' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'get role by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update role by id' });
});

router.post('/', (req, res) => {
  res.json({ message: 'post role' });
});

export default router;
