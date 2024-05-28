import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payLoad);
    return result;
}

const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find();
    return result;
}

const getSingleAcademicDepartmentFromDB = async (_id: string) => {
    const result = await AcademicDepartment.findById({ _id });
    return result;
}

const updateAcademicDepartmentFromDB = async (id: string, payLoad: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findOneAndUpdate({_id: id}, payLoad, { new: true} );
    return result;
}

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentFromDB,
}