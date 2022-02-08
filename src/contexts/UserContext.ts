import { createContext } from "react";
import User from "../models/User";

interface Context {
  user?: User | null;
  setUser?: React.Dispatch<React.SetStateAction<null>>;
  logout?: () => void;
}

const UserContext = createContext<Context>({});

export default UserContext;
