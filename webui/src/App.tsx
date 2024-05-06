import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Containers/Home";
import Run from "./Containers/Run";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/run/:id" element={<Run />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
