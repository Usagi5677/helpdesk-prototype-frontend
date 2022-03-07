import { Status } from "../models/Enums";

export function statusPostPosition(status: Status): string {
  if (["Open", "Pending"].includes(status)) return "since";
  else if (["Solved", "Closed", "Reopened"].includes(status)) return "";
  else return "";
}
