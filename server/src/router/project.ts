import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'get all project' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'get project by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update project by id' });
});

router.post('/', (req, res) => {
  res.json({ message: 'post project' });
});

export default router;
