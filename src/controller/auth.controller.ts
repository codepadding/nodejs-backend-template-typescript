import { Request, Response } from "express";
import UserModel, { SUBSCRUPTION_TYPE, USER_TYPE } from "../models/user.model";
import { checkUserExists } from "../service/user.service";
import { apiResponse } from "../utils/apiResponse";
import { generateUserJWT } from "../service/auth.service";
import moment from "moment";
import { generateSecretKey } from "../utils/utils";


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
      subscriptionType: SUBSCRUPTION_TYPE.FREE,
      subscribetionDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      exparationDate: moment().add(1, "week").format("YYYY-MM-DD HH:mm:ss"),
      apiSecretKey: generateSecretKey()
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



