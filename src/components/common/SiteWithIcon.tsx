import { FaClone } from "react-icons/fa";
import { stringToColor } from "../../helpers/style";
import Site from "../../models/Site";

const SiteWithIcon = ({ site, small }: { site?: Site; small?: boolean }) => {
  if (site)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: small ? "80%" : undefined,
          color: stringToColor(site.code),
        }}
      >
        <FaClone style={{ marginRight: small ? ".25rem" : ".5rem" }} />
        <div>{site.code}</div>
      </div>
    );
  return <div></div>;
};

export default SiteWithIcon;
