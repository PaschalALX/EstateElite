import Container from "./Container"
import HeroImage from "./HeroImage"
import { Link } from "react-router-dom"
import LogoDesktopSrc from "../assets/logo-desktop.svg"
import LogoMobileSrc from "../assets/logo-mobile.svg"
import { useEffect, useRef } from "react"

const Navbar = () => {

    let locationHash = document.location.hash
    let ulRef = useRef(null)

    useEffect(()=>{

        console.log((ulRef.current! as HTMLElement).querySelectorAll('a'))
    }, [locationHash])
    return (
        <>
        <nav className="relative z-10 h-14 md:h-20 flex items-center">
            <Container className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link 
                        to={'/'}
                        className="text-white md:text-[#B97745] text-[1.3em] font-bold"    
                        >
                        <img src={LogoDesktopSrc} alt="" width={'120px'} className="md:block hidden"/>
                        <img src={LogoMobileSrc} alt="" width={'120px'} className="md:hidden"/>
                    </Link>
                    <ul ref={ulRef} className="md:inline-flex hidden text-sm font-semibold mx-4 [&>li]:mx-2 [&>li:hover]:text-[#B97745] relative top-[1em]">
                        <li>
                            <a href="/"> HOME </a>
                        </li>
                        <li>
                            <a href="#about"> ABOUT </a>
                        </li>
                        <li>
                            <a href="#about"> FEATURED </a>
                        </li>
                        <li>
                            <a href="#about"> BLOGS </a>
                        </li>
                        <li>
                            <a href="#about"> CONTACTS </a>
                        </li>
                    </ul>
                </div>
                
                <Link
                     to={'/'} 
                     className="text-white md:text-[#B97745] relative top-[.7em] hover:underline"> 
                    My Account 
                </Link>
            </Container>
        </nav>
        <HeroImage></HeroImage>
        </>
    )
}

export default Navbar