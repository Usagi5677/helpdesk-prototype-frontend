import Comment from "./Comment";
import User from "./User";

export default interface CommentGroup {
  user: User;
  comments: Comment[];
}
