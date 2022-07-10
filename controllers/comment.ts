import { CommentService } from "../services/commentService";
import { Utils } from "../utils/utils";
import mongoose from "mongoose";

const utils = new Utils();
const commentService = new CommentService();

export class CommentController {
  getAllComments = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { productId } = JSON.parse(data);
        if (!mongoose.isValidObjectId(body.productId)) {
          return utils.responseUnauthor(res, 404, {
            message: "Sản phẩm không tồn tại",
          });
        }
        const comments = await commentService.getAllComments({
          productId: body.productId,
        });
        return utils.responseUnauthor(res, 200, comments);
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  createComment = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body = JSON.parse(data);
        const newComment = await commentService.createComment(body);

        if (newComment._id === undefined) {
          utils.responseUnauthor(res, 400, {
            message: "Bình luận không thành công",
          });
        }
        return utils.responseUnauthor(res, 200, newComment);
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  updateComment = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { id; data } = JSON.parse(data);
        if (!mongoose.isValidObjectId(body.id)) {
          return utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Bình luận này không tồn tại",
          });
        }
        const commentEdited = await commentService.updateComment({
          _id: body.id,
          data: body.data,
        });
        if (commentEdited._id === undefined) {
          return utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Không thể sửa bình luận",
          });
        }

        return utils.sendRespond(
          res,
          utils.getAccessToken(req),
          201,
          commentEdited
        );
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  deleteComment = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { id; type } = JSON.parse(data);
        if (!mongoose.isValidObjectId(body.id)) {
          return utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Bình luận này không tồn tại",
          });
        }

        if (body.type === 1) {
          const commentDeleted = await commentService.deleteComment({
            _id: body.id,
          });
          if (commentDeleted._id === undefined) {
            return utils.sendRespond(res, utils.getAccessToken(req), 404, {
              message: "Xóa bình luận không thành công. Vui lòng thử  lại",
            });
          }
          return utils.sendRespond(
            res,
            utils.getAccessToken(req),
            200,
            commentDeleted
          );
        } else if (body.type === 0) {
          const feedbackDeleted = await commentService.deleteComment({
            _id: body.id,
          });
          const replyDeleted = await commentService.deleteReply({
            parentId: body.id,
          });
          return utils.sendRespond(
            res,
            utils.getAccessToken(req),
            200,
            feedbackDeleted
          );
        }
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  getAllReplyComments = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { parentId } = JSON.parse(data);
        const checkLogin = req.headers["authorization"];
        const commentsReply = await commentService.getAllReplyByCommentIds({
          parentId: body.parentId,
        });
        if (checkLogin === undefined) {
          return utils.responseUnauthor(res, 200, commentsReply);
        }
        return utils.sendRespond(
          res,
          utils.getAccessToken(req),
          200,
          commentsReply
        );
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };
}
