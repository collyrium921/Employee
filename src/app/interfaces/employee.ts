import { IEmpInfo } from "./employeeInfo";

export interface IEmployee{
    companyName: string,
    address: string,
    email: string,
    phoneNumber: string,
    empInfo: IEmpInfo[]
}