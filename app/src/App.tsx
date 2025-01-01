import "./styles/global.css";

import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

// import { FormPersonal } from "./pages/FormPersonal"

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
