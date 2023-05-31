import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoDesktopSrc from "../assets/logo-desktop.svg";
import LogoMobileSrc from "../assets/logo-mobile.svg";
import Hamburger from 'hamburger-react'
import { useContext } from "react";
import { CgLogOut } from "react-icons/cg"

import Container from "../components/Container";
import NavList from "../components/Navlist";
import { appCtx } from "../context/appCtx";

const Navbar = () => {

  const {isMenuOpen, setMenuOpen, user, setUser} = useContext(appCtx)
  const location = useLocation()
  const navigate = useNavigate()

  const isAccountPath = location.pathname.match(/^\/myaccount/)

  const logout = () => {
    setUser(null)
    navigate('/')
  }

  const LogoutBtn = ({element}:{element:React.ReactNode}) => {
    return (
    <button
      onClick={logout}
      className="text-[#B97745] relative top-[.7em] hover:underline md:block hidden"
      title="logout"
    >
      {element}
    </button>)
  }
  return (
      <nav className="relative z-10 h-14 md:h-20 flex items-center py-4 pb-[75px]">

        {/* Desktop View */}
        <Container className="hidden justify-between items-center md:flex">
          <div className="flex items-center">
            <Link
              to={"/"}
              className="text-white md:text-[#B97745] text-[1.3em] font-bold"
            >
              <img
                src={LogoDesktopSrc}
                alt=""
                width={"120px"}
              />
            </Link>
            <ul className="inline-flex text-sm font-semibold mx-4 [&>li]:mx-2 [&>li:hover]:text-[#B97745] relative top-[1em]">
                <NavList/>
            </ul>
          </div>
          {
            isAccountPath && <LogoutBtn element={<div>Logout</div>}/>
          }
          {
            !isAccountPath &&
            <div className="flex [&>*]:ml-4">
            <Link
                to={'/myaccount/dashboard'}
                className="text-[#B97745] relative top-[.7em] hover:underline md:block hidden"
              >
              My Account
            </Link>
            {
              user && 
              <button
                onClick={logout}
                className="text-[#B97745] relative top-[.7em] hover:underline md:block hidden"
                title="logout"
              >
                <CgLogOut/>
              </button>
            }
          </div>
          }
          
        </Container>

        {/* Mobile view */}
        <Container className="flex justify-between items-center md:hidden">
            <Link
              to={"/"}
              className="text-white md:text-[#B97745] text-[1.3em] font-bold"
            >
              <img
                src={LogoMobileSrc}
                alt=""
                width={"100px"}
                className="md:hidden"
              />
            </Link>
          <Hamburger toggle={()=>setMenuOpen((v)=>!v)} toggled={isMenuOpen} color="#F2EDE9"/>
        </Container>
      </nav>
  );
};

export default Navbar;
