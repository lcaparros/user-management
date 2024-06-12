import User from '../models/User.js';
import { errorHandler } from '../utils/errorHandler.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        errorHandler(res, error);
    }
};
