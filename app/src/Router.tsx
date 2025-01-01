import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Cadastrar } from "./pages/Cadastrar";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {/* The index route will render Cadastrar when at the base path */}
        <Route index element={<Home />} />

        {/* Uncomment this line when you have the FormCourses component */}
        <Route path="/Cadastrar" element={<Cadastrar />} />
      </Route>
    </Routes>
  );
}
