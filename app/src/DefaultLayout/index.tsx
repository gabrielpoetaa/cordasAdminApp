import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/index";

export function DefaultLayout() {
  return (
    <div lang="en" className="antialiased min-h-screen grid grid-cols-app">
      <Sidebar />
      <div className="px-4 pb-12 pt-8">
        <Outlet /> {/* O conteúdo das rotas será renderizado aqui */}
      </div>
    </div>
  );
}
