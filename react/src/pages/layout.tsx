import Navbar from "../molecules/Navbar"
import HeroImage from "../components/HeroImage";
import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import SideMenu from "../molecules/SideMenu";

const Layout = () => {
    return <>
        <Navbar/>
        <HeroImage/>
        <Container className="relative z-10]">
            <Outlet/>
        </Container>
        <SideMenu/>
    </>
}

export default Layout