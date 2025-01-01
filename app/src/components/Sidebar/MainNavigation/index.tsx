import { BarChart, CheckSquare, Flag, Home, SquareStack, Users } from "lucide-react";
import { NavItem } from "./NavItem";

export function MainNavigation () {
  return (
    <nav className="space-y-2">
     <NavItem title="Home" icon={Home} to="/" />
     <NavItem title="Cadastrar" icon={BarChart} to="/Cadastrar" />
     {/* <NavItem title="Projects" icon={SquareStack} to="/" />
     <NavItem title="Tasks" icon={CheckSquare} to="/" />
     <NavItem title="Reporting" icon={Flag} to="/" />
     <NavItem title="Users" icon={Users} to="/" /> */}
    </nav>
  )
} 