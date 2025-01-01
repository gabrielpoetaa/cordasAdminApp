import { ChevronDown } from "lucide-react";
import { ElementType } from "react";
import { Link } from "react-router-dom"; // Importando o Link

export interface NavItemProps {
  title: string;
  icon: ElementType;
  to: string; // Adicionando o prop to
}

export function NavItem({ title, icon: Icon, to }: NavItemProps) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded px-3 py-2 hover:bg-goldCordas_50"
    >
      <Icon className="h-5 w-5 text-zinc-500" />
      <span className="font-semibold text-zinc-700 group-hover:text-goldCordas_400">
        {title}
      </span>
      <ChevronDown className="ml-auto h-5 w-5 text-zinc-400 group-hover:text-goldCordas_300" />
    </Link>
  );
}
