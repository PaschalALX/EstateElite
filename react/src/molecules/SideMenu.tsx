import { useContext } from "react"

import LogoDesktopSrc from "../assets/logo-desktop.svg";
import { appCtx } from "../context/appCtx"
import NavList from "../components/Navlist"
import { useNavigate, useLocation } from "react-router-dom";
import { CgLogOut } from "react-icons/cg"

const SideMenu = () => {
    const {isMenuOpen, setMenuOpen, user, setUser} = useContext(appCtx)
    const location = useLocation()
    const navigate = useNavigate()

    const isAccountPath = location.pathname.match(/^\/myaccount/)
    
    const logout = () => {
        setUser(null)
        navigate('/')
      }

    const gotoDashboard = () => {
        setMenuOpen(false)
        navigate('/myaccount/dashboard')
    }
    return (
        <div 
            className={`${!isMenuOpen && 'hidden'}
                        bg-[#F2EDE9] absolute top-0 left-0 w-3/4 
                        h-screen  flex items-center justify-center z-30`}
            >
                <div className="w-full">
                    <img src={LogoDesktopSrc} alt="" className="absolute top-5 left-6" width={'100px'}/>
                    { user  && 
                        <button 
                            className="absolute top-10 right-10 flex items-center gap-1 text-[#B97745]" 
                            onClick={logout}> 
                            <span>logout</span> 
                            <CgLogOut/>
                        </button>
                    }

                    <ul className="[&>li]:text-[#3f3a36] [&>li]:my-4 [&>li]:text-center [&>li]:shadow-sm#B97745 [&>li]:mx-3 [&>li]:py-2">
                        <NavList/>
                        {
                            !isAccountPath &&     
                            <li 
                                className="text-sm text-[#B97745] font-bold">
                                    <button
                                        onClick={gotoDashboard}
                                        className="bg-[#B97745] p-2 px-6 rounded-md relative top-6"
                                        style={{ color:'#f1d9c5'}}
                                    >
                                        My Account 
                                    </button>
                            </li>
                        }
                    </ul>
                </div>
        </div>
  )
}

export default SideMenu