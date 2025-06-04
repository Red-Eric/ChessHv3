import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Tuto } from "./pages/tuto";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tuto" element={<Tuto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;