import { useState } from "react";
import "./App.css";
import { ToolBar } from "./components/ToolBar/ToolBar.jsx";
import { WeatherDetails } from "./components/Weather/Weather.jsx";

function App() {
  const [latitudes, setLatitudes] = useState("");
  console.log(latitudes);
  return (
    <>
      <ToolBar setLatitudes={setLatitudes} />
      <WeatherDetails latitudes={latitudes} />
    </>
  );
}

export default App;
