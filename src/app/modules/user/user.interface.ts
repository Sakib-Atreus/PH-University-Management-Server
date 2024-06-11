/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    academicDepartment: Types.ObjectId;
};

export interface UserModel extends Model<TUser> {
    // myStaticMethod(): number;
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(plainTextPassword: string, hashPassword: string): Promise<boolean>;
}
