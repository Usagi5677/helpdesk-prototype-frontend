import User from "./User";

export default interface Comment {
  id: number;
  createdAt: Date;
  user: User;
  body: string;
  mode: string;
}
