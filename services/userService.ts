import { IUser } from "../models/user";
import { BasicService } from "./basicService";

export class UserService extends BasicService {
    getAllUsers(): Promise<IUser[]> {
        return this.userDB.getAllUsers();
    }
    findUserByEmail(args: { email: string }): Promise<IUser> {
        return this.userDB.findUserByEmail({ email: args.email });
    }
    updateUser(args: {email: string, data: any}): Promise<IUser> {
        return this.userDB.updateUser(args)
    }
    deleteUser(args: {email: string}): Promise<IUser> {
        return this.userDB.deleteUser(args)
    }
    createUser(args: IUser): Promise<IUser> {
        return this.userDB.createUser(args);
    }
}