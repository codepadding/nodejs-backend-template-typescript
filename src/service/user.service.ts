import UserModel from "../models/user.model";
const bcrypt = require('bcrypt');

export const checkUserExists = async (query: Object) => {
  const user = await UserModel.findOne({
    ...query,
    deletedAt: null,
  }).lean();

  if (user) {
    return user;
  }

  return null;
};

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
  } catch (error) {
      // Handle error
      console.error('Error hashing password:', error);
      throw new Error('Error hashing password');
  }
}

export const generateUserPasswordHash = async (password: string) => {
  const hashedPassword = await hashPassword(password)
  return hashedPassword
}
