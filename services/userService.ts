import { IUser } from "../models/user";
import { BasicService } from "./basicService";

export class UserService extends BasicService {
    async getAllUsers(): Promise<IUser[]> {
        return this.userDB.getAllUsers();
    }
    async findUserByEmail(args: { email: string }): Promise<IUser> {
        return this.userDB.findUserByEmail({ email: args.email });
    }
    async updateUser(args: { email: string, data: any }): Promise<IUser> {
        return this.userDB.updateUser(args)
    }
    async deleteUser(args: { email: string }): Promise<IUser> {
        return this.userDB.deleteUser(args)
    }
    async createUser(args: IUser): Promise<IUser> {
        return this.userDB.createUser(args);
    }

}