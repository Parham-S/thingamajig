// ./server/routes/users.js

import express from 'express';
const router = express.Router();

import  { signUpSchema, signInSchema } from '../middleware/schemas';
import auth from '../middleware/auth';
import { signInUser, signUpUser, getCurrentUser } from '../controllers/users';

// POST /api/v1/users/signup
router.post('/signup', signUpSchema, signUpUser);

// POST /api/v1/users/signin
router.post('/signin', signInSchema, signInUser);

/**
 * @api {get} /api/v1/users/current
 * Authentication required
 */
router.get('/current', auth, getCurrentUser);

export default router;