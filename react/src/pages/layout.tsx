import Navbar from "../molecules/Navbar"
import HeroImage from "../components/HeroImage";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return <>
        <Navbar/>
        <HeroImage/>
        <Outlet/>
    </>
}

export default Layout