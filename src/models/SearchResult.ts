import User from "./User";
import UserGroup from "./UserGroup";

export default interface SearchResult {
  name: string;
  type: string;
  user?: User;
  userGroup?: UserGroup;
}
