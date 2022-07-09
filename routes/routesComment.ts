import { CommentController } from "../controllers/comment";
import { Required } from "../middlewares/userRequired";
import { Router } from "./Router";

const controllers = new CommentController()
const router = new Router()
const required = new Required()

router.post('/comments', controllers.getAllComments)
router.post('/comment/post', controllers.createComment)
router.post('/comment/edit', controllers.updateComment)
router.post('/comment/delete', controllers.deleteComment)
router.post('/comment/reply', controllers.getAllReplyComments)

export default router
