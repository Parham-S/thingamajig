import bcrypt from "bcryptjs";
import User from "../models/user";
import Profile from '../models/profile';
import { signToken, getPayloadObjFromUser } from '../helpers/index';
import { ErrorHandler } from '../helpers/error';
import { Request, Response, NextFunction } from 'express';

function mergedUserWithProfile(user, profile) {
  delete profile.id;
  delete profile.user_id;
  delete user.password_hash;
  return { ...user, ...profile };
}

async function signUpUser(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const hasRows = await User.hasRows({ user_name: req.body.user_name });
    if (hasRows) {
      throw new ErrorHandler(400, 'Username already exists');
    }

    const user = await User.create(req.body);
    const profile = await Profile.create({ ...req.body, user_id: user.id });

    const token = signToken(getPayloadObjFromUser(user));
    res.status(201).json({
      user: mergedUserWithProfile(user, profile),
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function signInUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // any validation should go here
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new ErrorHandler(400, 'Invalid credentials');
    }

    const profile = await Profile.findOne({ user_id: user.id });

    res.status(200).json({
      user: mergedUserWithProfile(user, profile),
      token: signToken(getPayloadObjFromUser(user)),
    });
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    // If our code gets here, it went through our middleware
    // first so we should have our email address of the logged
    // in person through req.user.

    const [user, profile] = await Promise.all([
      User.findOne({ id: req.user }),
      Profile.findOne({ user_id: req.user }),
    ]);

    return res.json(mergedUserWithProfile(user, profile));
  } catch (err) {
    next(err);
  }
}

export { signUpUser, signInUser, getCurrentUser };
