import Site from "./Site";

export default interface Category {
  id: number;
  name: string;
  site?: Site;
}
