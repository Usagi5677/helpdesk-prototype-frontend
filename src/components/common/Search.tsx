import { FaSearch, FaTimes } from "react-icons/fa";
import { ChangeEvent } from "react";

const Search = ({
  searchValue,
  onChange,
  onClick,
}: {
  searchValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 20,
        padding: 5,
        paddingLeft: 10,
      }}
    >
      <FaSearch style={{ color: "#ccc", paddingRight: 10, fontSize: 25 }} />
      <input
        type="text"
        name=""
        id="SearchInput"
        placeholder="Search"
        value={searchValue}
        onChange={onChange}
      />
      {searchValue !== "" && (
        <FaTimes
          style={{
            color: "#ccc",
            paddingRight: 10,
            cursor: "pointer",
            fontSize: 25,
            marginLeft: -25,
          }}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Search;
