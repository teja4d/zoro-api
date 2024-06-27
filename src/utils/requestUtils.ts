import { body, ValidationChain } from 'express-validator';

export const validateLoginRequest = (): ValidationChain[] => [
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Password is required').not().isEmpty(),
];

export const validateRegisterRequest = (): ValidationChain[] => [
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];
