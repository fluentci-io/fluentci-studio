import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Containers/Home";
import Run from "./Containers/Run";
import Project from "./Containers/Project";
import Auth from "./Containers/Auth";

function App() {
  const Router = location.host ? BrowserRouter : HashRouter;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/run/:id" element={<Run />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
