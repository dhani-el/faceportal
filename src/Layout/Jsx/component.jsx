import { Outlet } from "react-router-dom";






export function Houtlet(){
    return <div id="outlet" className="min-h-screen overflow-hidden">
        <Outlet/>
    </div>
}