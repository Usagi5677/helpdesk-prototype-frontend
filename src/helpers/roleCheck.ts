import User from "../models/User";

export default function isAdmin(user: User) {
  if (user.roles.includes("Admin")) return true;
  return false;
}
