import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";

const generateUserJWT = async (query : Object) => {
  
      const user = await UserModel.findOne({...query, deletedAt: null }).populate(['image'])
    
    if (!user) {
        throw new Error('user not found')
    }

    const sanitizedUser = { ...user.toObject() };
    delete sanitizedUser.password;

    const jwtData = {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };

    const token = jwt.sign(jwtData, process.env.JWT_PRIVATE_KEY_USER || '', {expiresIn: 60 * 60})

    // const refreshToken = jwt.sign({ 
    //     userId: user._id, 
    // }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); 

    // Assigning refresh token in http-only cookie  

    return {token, user: sanitizedUser}
}

const HashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
} 

export {
    generateUserJWT,
    HashPassword
}