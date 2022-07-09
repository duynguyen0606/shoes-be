import { model, Model, Schema, Types } from "mongoose";
import { CommentInfor, IComment, TypeComment } from "../../models/comment";
import { ICommentDb } from "../interface/comment.interface";
import { userTable } from "./user";

export interface ICommentDocument extends IComment, Document {
    _id: any;
}
interface ICommentSchema extends Model<ICommentDocument>{

}

export const commentTableName = "Comment";
const schema = new Schema<ICommentDocument, ICommentSchema>({
    content:{
        type: 'string',
        required: true
    },
    owner:{
        type: Types.ObjectId,
        ref: userTable
    },
    productId:{
        type: 'string',
        required: true
    },
    type: {
        type: 'number',
        required: true,
        default: 0
    },
    parentId:{
        type: 'string',
    },
    amountReply:{
        type: 'number',
        default: 0
    }
}, {
    timestamps: true
})

export const commentModel = model(commentTableName, schema);

export class CommentDb implements ICommentDb {
    async getAllComments(agrs: {productId: string}): Promise<IComment[]> {
       return await commentModel.find({productId: agrs.productId, type: TypeComment.feedback }).populate('owner').exec();
    }
    async getAllReplyByCommentIds(agrs:{ parentId: string }): Promise<IComment[]> {
       return await commentModel.find({ parentId: agrs.parentId, type: TypeComment.reply });
    }
    async createComment(agrs: IComment): Promise<IComment> {
       const comment = new commentModel(agrs);
       await comment.save();
       return new CommentInfor(comment);
    }
    async updateComment(agrs: { _id: string; data: any; }): Promise<IComment> {
    //    const comment = await commentModel.findByIdAndUpdate(agrs._id, agrs.data, {new: true})
       return new CommentInfor(await commentModel.findByIdAndUpdate(agrs._id, agrs.data, {new: true}));
    }
    async deleteComment(agrs: { _id: string; }): Promise<IComment> {
       const comment = await commentModel.findByIdAndDelete(agrs._id);
       return new CommentInfor(comment);
    }

    async deleteReply(agrs: {parentId: string;}) {
        return await commentModel.deleteMany({parentId: agrs.parentId });
    }
}