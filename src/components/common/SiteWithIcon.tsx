import { FaClone } from "react-icons/fa";
import { stringToColor } from "../../helpers/style";
import Site from "../../models/Site";

const SiteWithIcon = ({
  site,
  small,
  showName = false,
}: {
  site?: Site;
  small?: boolean;
  showName?: boolean;
}) => {
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
        {showName && (
          <span style={{ marginLeft: ".5rem", opacity: "0.4", color: "black" }}>
            {site.name}
          </span>
        )}
      </div>
    );
  return <div></div>;
};

export default SiteWithIcon;
