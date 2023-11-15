import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateDirectory from "./components/CreateDirectory";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CreateDirectory />
    </>
  );
}

export default App;
