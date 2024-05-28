import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payLoad: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payLoad);
    return result;
}

const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

const getSingleAcademicFacultyFromDB = async (_id: string) => {
    const result = await AcademicFaculty.findById({ _id });
    return result;
}

const updateAcademicSemesterFromDB = async (id: string, payLoad: Partial<TAcademicFaculty>) => {
    const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payLoad, { new: true });

    return result;
} 


export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicSemesterFromDB,
}