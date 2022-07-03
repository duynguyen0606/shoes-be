import { IUser, UserInfor } from "./user";

export interface IComment {
    _id?: string | undefined;
    content: string;
    owner: IUser;
    productId: string;
    type: TypeComment;
    parentId?: string;
    amountReply: number;
}
export enum TypeComment {
    feedback, reply
}
export class CommentInfor {
    _id?: string | undefined;
    content: string;
    owner: IUser;
    productId: string;
    type: TypeComment;
    parentId?: string;
    amountReply: number;

    constructor(args?: any) {
        this._id = args?._id?? undefined;
        this.content = args?.content?? "";
        this.owner = args?.owner ?? new UserInfor();
        this.productId = args?.productId?? "";
        this.type = args?.type?? TypeComment.feedback;
        this.parentId = args?.parentId?? "";
        this.amountReply = args?.amountReply?? 0;
    }
}