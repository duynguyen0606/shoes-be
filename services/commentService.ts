import { IComment } from "../models/comment";
import { BasicService } from "./basicService";

export class CommentService extends BasicService {
    async getAllComments(args: { productId: string}): Promise<IComment[]> {
        return this.commentDB.getAllComments(args)
    }
    async getAllReplyByCommentIds(args: { parentId: string }): Promise<IComment[]> {
        return this.commentDB.getAllReplyByCommentIds(args);
    }
    async createComment(args: any): Promise<IComment> {
        return this.commentDB.createComment(args);
    }
    async updateComment(args: {_id: string, data: any}): Promise<IComment> {
        return this.commentDB.updateComment(args)
    }
    async deleteComment(args: {_id: string}): Promise<IComment> {
        return this.commentDB.deleteComment(args)
    }
    async deleteReply(args: {parentId: string}) {
        return this.commentDB.deleteReply(args)
    }
}