import Site from "./Site";
import User from "./User";

export default interface KnowledgebaseModel {
  id: number;
  createdAt: Date;
  createdBy: User;
  title: string;
  body: string;
  mode: string;
  site: Site;
}
