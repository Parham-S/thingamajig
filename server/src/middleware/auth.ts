import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

function getTokenFromRequest(req: Request, res: Response, next: NextFunction) {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(403).json({ message: 'No token. Unauthorized.' });
    }

    if (jwt.verify(token, process.env.JWT_SECRET)) {
      req.decode = jwt.decode(token);
      req.user = req.decode.id;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
}

export = getTokenFromRequest;
