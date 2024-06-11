import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken';
import config from "../../config";

const loginUser = async (payLoad: TLoginUser) => {

    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(payLoad.id);

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;

    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if(userStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
    }

    // checking if the password is correct
    if(!(await User.isPasswordMatched(payLoad?.password, user?.password)))

    // Access Granted: Send Access Token and Refresh Token
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');	

    //create token and sent to the client

    const jwtPayload = {
        userId: user,
        role: user.role,
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
        expiresIn: '10d' 
    }
    ) 

    return {
        accessToken,
        needsPasswordChange: user?.needsPasswordChange,
    }
}

export const AuthServices = {
    loginUser,
}