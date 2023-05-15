import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PermissionType } from '../enums/enums';

interface JWTTypes {
  id: string;
  email: string;
  permision: string;
  iat: number;
}

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, permission: user.permission },
    process.env.JWT_SECRET
  );
  return token;
};

export const protectRoutes = (permissionType: PermissionType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //console.log('Header: ', req.cookies.JWT_ACCESS_TOKEN);
    //const bearer = req.headers.authorization;
    const bearer = 'Bearer ' + req.cookies?.JWT_ACCESS_TOKEN;

    if (!bearer) {
      res.status(401);
      res.send({ errors: [{ msg: 'Unauthorized' }] });
      return;
    }

    const [, token] = bearer.split(' ');
    if (!token) {
      res.status(401);
      res.send({ errors: [{ msg: 'Unauthorized' }] });
      return;
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload && typeof payload != 'string') {
        req.body.user = payload;
        if (payload.permission === PermissionType.ADMIN) {
          next();
        } else if (payload?.permission === permissionType) {
          next();
        } else {
          res.status(401);
          res.send({ errors: [{ msg: 'Unauthorized' }] });
        }
      }
      return;
    } catch (e) {
      res.status(401);
      res.send({ errors: [{ msg: 'Unauthorized' }] });
      return;
    }
  };
};

// (req: Request, res: Response, next: NextFunction) => {
//   const bearer = req.headers.authorization;

//   if (!bearer) {
//     res.status(401);
//     res.send('401 Not authorized');
//     return;
//   }

//   const [, token] = bearer.split(' ');
//   if (!token) {
//     res.status(401);
//     res.send('401 Not authorized');
//     return;
//   }

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     if (payload) {
//       console.log('JWT data: ', payload);
//       req.body.user = payload;
//       //req.user = payload;
//       console.log(payload);
//       next();
//     }
//     return;
//   } catch (e) {
//     console.error(e);
//     res.status(401);
//     res.send('401 Not authorized');
//     return;
//   }
// };

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};
