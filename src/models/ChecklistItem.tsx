import Ticket from "./Ticket";
import User from "./User";

export default interface ChecklistItem {
  id: number;
  ticket: Ticket;
  description: string;
  completedBy: User;
  completedAt: Date;
}
