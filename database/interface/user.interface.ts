import { IUser } from "../../models/user";

export interface IUserDb {
    findUserByEmail(args: { email: string }): Promise<IUser>;
    createUser(args: { email: string, password: string, name, role: number }) : Promise<IUser>;
    updateUser(args: { email: string, data: any }) : Promise<IUser>;
    deleteUser(args: { email: string}): Promise<IUser>;
    getAllUsers(): Promise<IUser[]>;
}