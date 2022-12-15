import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'get all users' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'get user by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update user by id' });
});

router.post('/', (req, res) => {
  res.json({ message: 'post user' });
});

export default router;
