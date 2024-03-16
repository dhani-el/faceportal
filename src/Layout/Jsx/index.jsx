import { useEffect } from "react";
import { Header, Footer } from "../../Home/JSX/component";
import { Houtlet } from "./component";
import { useLocation } from "react-router-dom";
import "../Styles/index.css"





export default function Layout(){
    const {pathname} = useLocation()
    useEffect(function(){
        window.scrollTo(0, 0);
    },[pathname]);
    return <div className="relative">
                <Header/>
                <Houtlet/>
                <Footer/>
            </div>
}