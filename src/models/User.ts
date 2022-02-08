export default interface User {
  id: number;
  rcno: number;
  fullName: string;
  userId: string;
  email: string;
  roles: string[];
  isAdmin?: boolean;
  isAgent?: boolean;
}
