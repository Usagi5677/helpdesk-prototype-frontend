import Category from "./Category";
import ChecklistItem from "./ChecklistItem";
import { Status } from "./Enums";
import User from "./User";

export default interface Ticket {
  id: number;
  createdAt: Date;
  createdBy: User;
  status: Status;
  title: string;
  body?: string;
  rating: number;
  feedback: string;
  started: boolean;
  priority?: String;
  categories: Category[];
  agents: User[];
  ownerId?: number;
  followers: User[];
  checklistItems: ChecklistItem[];
}
