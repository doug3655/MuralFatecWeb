import "./style.css"
import Menu from "../../components/menu";
import { Outlet } from "react-router-dom"

export default function Layout(){
    return (   
        <div className="layout-fundo">        
            <Menu/>
            <Outlet />
        </div>
    );
}