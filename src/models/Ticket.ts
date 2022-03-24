import Category from "./Category";
import ChecklistItem from "./ChecklistItem";
import { Priority, Status } from "./Enums";
import Site from "./Site";
import User from "./User";

export default interface Ticket {
  id: number;
  createdAt: Date;
  createdBy: User;
  status: Status;
  statusChangedAt?: Date;
  title: string;
  body?: string;
  rating?: number;
  feedback?: string;
  started: boolean;
  priority?: Priority;
  categories: Category[];
  agents: User[];
  ownerId?: number;
  followers: User[];
  checklistItems: ChecklistItem[];
  site: Site;
}
