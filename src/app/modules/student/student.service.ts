import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  //const result = await Student.aggregate([{ $match: { id } }]);
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentFromDB = async (id: string, payLoad: Partial<TStudent>) => {
  //const result = await Student.aggregate([{ $match: { id } }]);

  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;

  const modifiedUpdatedData : Record<string, unknown> = {
    ...remainingStudentData,
  }

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate(
    { id }, 
    modifiedUpdatedData,
    { new: true, runValidators: true}
  )

  return result;
};

const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession()

  try{
    session.startTransaction()
    const result = await Student.findOneAndUpdate(
      { id }, 
      { isDeleted: true },
      { new: true, session}
    );

    if(!result){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student!');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true},
      { new: true, session}
    );

    if(!deleteUser){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student!');
    }

    await session.commitTransaction();
    await session.endSession();
    
    return result;
  }catch(err){
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student!');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB
};
