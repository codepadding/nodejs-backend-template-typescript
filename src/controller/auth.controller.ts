import { Request, Response } from "express";
import UserModel, { USER_TYPE } from "../models/user.model";
import { checkUserExists } from "../service/user.service";
import { apiResponse } from "../utils/apiResponse";
import { generateUserJWT } from "../service/auth.service";


export const googleAuthSignUp = async (req: Request, res: Response) => {
  const { displayName, email, picture, }: any = req.body;
  const exists = await checkUserExists({ email: email });
  if (exists) {
    const { token, user } = await generateUserJWT({
      _id: String(exists._id),
    });
    return apiResponse({
      res,
      message: "Successfully Register",
      data: {
        token,
        user,
      },
    });
  }



  const users = await UserModel.create(
    {
      displayName,
      email,
      image: picture,
    },
  );

  const { token, user } = await generateUserJWT({
    _id: String(users._id),
  });

  return apiResponse({
    res,
    message: "Successfully Register",
    data: {
      token,
      user,
    },
  });
};



