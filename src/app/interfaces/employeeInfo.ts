export interface IEmpInfo{
    empName: string,
    designation: string,
    joinDate: string,
    email: string,
    phoneNumber: string,
    skillInfo: {
        skilllName: string,
        skillRating: string,
    }[],
    educationInfo: {
        instituteName: string,
        courseName: string,
        completedYear: string
    }[]
}