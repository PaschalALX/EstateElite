import HeroImage from "../components/HeroImage"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <HeroImage/>
            <Outlet/>
        </>
    )
}

export default Layout