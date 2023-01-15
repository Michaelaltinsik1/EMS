import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, permission: user.permission },
    process.env.JWT_SECRET
  );
  return token;
};

export const protectRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send('401 Not authorized');
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    console.log('here');
    res.status(401);
    res.send('401 Not authorized');
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = payload;
    //req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send('401 Not authorized');
    return;
  }
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};
