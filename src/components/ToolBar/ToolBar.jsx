import { useState } from "react";
import { SearchBar } from "./SearchBar/SearchBar.jsx";

export const ToolBar = ({ setLatitudes }) => {
  return (
    <div className="tool-bar">
      <SearchBar setLatitudes={setLatitudes} />
    </div>
  );
};
