import { useState } from "react";
import "./App.css";
import { ToolBar } from "./components/ToolBar/ToolBar.jsx";
import { WeatherDetails } from "./components/Weather/Weather.jsx";

function App() {
  const [userSelection, setUserSelection] = useState();
  return (
    <>
      <ToolBar setUserSelection={setUserSelection} />
      <WeatherDetails userSelection={userSelection} />
    </>
  );
}

export default App;
