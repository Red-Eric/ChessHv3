import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Tuto } from "./pages/tuto";

function Navigation() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tuto" element={<Tuto />} />
      </Routes>
    </HashRouter>
  );
}

export default Navigation;
