import { IComment } from "../../models/comment";

export interface ICommentDb {
    getAllComments(args: {productId: string}): Promise<IComment[]>;
    getAllReplyByCommentIds(args: {parentId: string}): Promise<IComment[]>;
    createComment(agrs: IComment): Promise<IComment>;
    updateComment(agrs: { _id: string, data: any }): Promise<IComment>;
    deleteComment(agrs: { _id: string }): Promise<IComment>;
    deleteReply(args: {parentId: string});
}