import { Search } from 'lucide-react'
import logo from '../../assets/logoCordas.png'
import { MainNavigation } from './MainNavigation'
import { InputControl, InputPrefix, InputRoot } from '../input'

export function Sidebar() {
  return (
    <div className="border-r border-zinc-200 px-5 py-8 space-y-6">
    <header className="flex items-center gap-5">    
    {/* <Webhook className="h-8 w-8 text-goldCordas_400" /> */}
    <img src={logo} className="h-22 w-22"></img>
    {/* <p className="font-medium text-xl text-goldCordas_500">Cordas Admin</p> */}
    </header>
    <InputRoot>
      <InputPrefix>
        <Search className="h-5 w-5 text-zinc-500" />
      </InputPrefix>
      <InputControl placeholder="Search" />
    </InputRoot>
    <MainNavigation />
    </div>
  
  )
}


