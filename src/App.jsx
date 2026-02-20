import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Terminos from "./pages/Terminos";
import AvisoPrivacidad from "./pages/AvisoPrivacidad";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
      </Routes>
    </Router>
  );
}

export default App;
