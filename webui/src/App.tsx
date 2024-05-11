import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Containers/Home";
import Run from "./Containers/Run";
import Project from "./Containers/Project";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/run/:id" element={<Run />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
