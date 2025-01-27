import { SearchBar } from "./SearchBar/SearchBar.jsx";

export const ToolBar = ({ setUserSelection }) => {
  return (
    <div className="tool-bar">
      <SearchBar setUserSelection={setUserSelection} />
    </div>
  );
};
