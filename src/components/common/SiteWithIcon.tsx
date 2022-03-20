import { FaClone } from "react-icons/fa";
import { stringToColor } from "../../helpers/style";
import Site from "../../models/Site";

const SiteWithIcon = ({ site, small }: { site: Site; small?: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: small ? "80%" : undefined,
        color: stringToColor(site.name),
      }}
    >
      <FaClone style={{ marginRight: ".5rem" }} />
      <div>{site.name}</div>
    </div>
  );
};

export default SiteWithIcon;
