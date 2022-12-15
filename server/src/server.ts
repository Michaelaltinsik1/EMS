import express from 'express';
import addressRouter from './router/address';
import departmentRouter from './router/department';
import leaveRouter from './router/leave';
import noticeRouter from './router/notice';
import projectRouter from './router/project';
import roleRouter from './router/role';
import timereportRouter from './router/timereport';
import userRouter from './router/user';

const app = express();

app.get('/', (req, res) => {
  console.log('logg in');
  res.status(200);
  res.json({ message: 'Sign in please' });
});

app.use('/addresses', addressRouter);
app.use('/departments', departmentRouter);
app.use('/leaves', leaveRouter);
app.use('/notices', noticeRouter);
app.use('/projects', projectRouter);
app.use('/roles', roleRouter);
app.use('/timereports', timereportRouter);
app.use('/users', userRouter);

export default app;
