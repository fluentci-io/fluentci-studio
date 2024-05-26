import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Containers/Home";
import Run from "./Containers/Run";
import Project from "./Containers/Project";

function App() {
  const Router = location.host ? BrowserRouter : HashRouter;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/run/:id" element={<Run />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
