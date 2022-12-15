import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'get all notices' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'get notice by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update notice by id' });
});

router.post('/', (req, res) => {
  res.json({ message: 'post notice' });
});

export default router;
