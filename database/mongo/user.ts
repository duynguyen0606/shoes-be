import { IUserDb } from './../interface/user.interface';
import { model, Model, Schema } from 'mongoose';
import { any } from 'webidl-conversions';
import { IUser, UserInfor } from './../../models/user';

export const userTable = 'User';
export interface IUserDocument extends IUser, Document {
    _id: any;
}
interface IUserSchema extends Model<IUserDocument>{

}
const UserSchema = new Schema<IUserDocument, IUserSchema>({
    name: {
        type: 'string',
        required: true,
        trim: true
    },
    email: {
        type: 'string',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
        trim: true
    },
    address: {
        type: 'string',
        trim: true
    },
    phoneNumber: {
        type: 'string',
        trim: true
    },
    role: {
        type: 'number',
        required: true,
        default: 0
    }
})

const UserModel = model(userTable, UserSchema);

export {UserModel};

export class UserDb implements IUserDb {
    async findUserByEmail(args: { email: string; }): Promise<IUser> {
        const user = await UserModel.findOne({ email: args.email});
        return new UserInfor(user);
    }
    async createUser(args: { email: string; password: string; name: any; role: number; }): Promise<IUser> {
        const newUser = new UserModel(args);
        await newUser.save();
        return new UserInfor(newUser);
    }
    async updateUser(args: { email: string; data: any; }): Promise<IUser> {
        const user = await UserModel.findOneAndUpdate({ email: args.email }, args.data, {
            new: true,
        });
        return new UserInfor(user);
    }
    async deleteUser(args: { email: string; }): Promise<IUser> {
        return new UserInfor(await UserModel.findOneAndDelete({ email: args.email}));
    }
    async getAllUsers(): Promise<IUser[]> {
        return await UserModel.find();
    }
}