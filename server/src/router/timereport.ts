import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'get all timereport' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'get timereport by id' });
});
router.put('/:id', (req, res) => {
  res.json({ message: 'update timereport by id' });
});

router.post('/', (req, res) => {
  res.json({ message: 'post timereport' });
});
router.delete('/:id', (req, res) => {
  res.json({ message: 'delete timereport by id' });
});
export default router;
