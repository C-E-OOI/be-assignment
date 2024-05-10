import { Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { STATUS } from '../constants/status';

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(STATUS.AUTHORIZATION_ERROR).json({ error: 'Unauthorized' });
    }

    const { data: user, error } = await supabase.auth.getUser(token);
    if (error) {
      console.error('Error authenticating user:', error);
      return res.status(STATUS.AUTHORIZATION_ERROR).json({ error: 'Unauthorized' });
    }

    if (!user) {
      return res.status(STATUS.AUTHORIZATION_ERROR).json({ error: 'Unauthorized' });
    }

    req.user = user as any;
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.status(STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
  }
};