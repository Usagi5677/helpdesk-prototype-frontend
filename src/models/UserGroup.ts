import User from "./User";

export default interface UserGroup {
  id: number;
  name: string;
  mode: string;
  users?: User[];
}
