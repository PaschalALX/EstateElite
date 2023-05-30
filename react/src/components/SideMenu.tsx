import { useContext } from "react"

import LogoDesktopSrc from "../assets/logo-desktop.svg";
import { appCtx } from "../context/appCtx"
import NavList from "./Navlist"

const SideMenu = () => {
    const {isMenuOpen, setMenuOpen, setAccountModalOpen} = useContext(appCtx)
    return (
        <div 
            className={`${!isMenuOpen && 'hidden'}
                        bg-[#F2EDE9] absolute top-0 left-0 w-3/4 
                        h-screen  flex items-center justify-center`}
            >
                <div className="w-full">
                    <img src={LogoDesktopSrc} alt="" className="absolute top-5 left-6" width={'100px'}/>
                    <ul className="[&>li]:text-[#3f3a36] [&>li]:my-4 [&>li]:text-center [&>li]:shadow-sm#B97745 [&>li]:mx-3 [&>li]:py-2">
                        <NavList/>
                        <li 
                            className="text-sm text-[#B97745] font-bold"
                            
                            onClick={()=>{
                                setMenuOpen(false)
                                setAccountModalOpen((v)=>!v)
                            }}>
                                <span 
                                    className="bg-[#B97745] p-2 px-6 rounded-md relative top-6"
                                    style={{ color:'#f1d9c5'}}
                                >
                                    My Account 
                                </span>
                        </li>
                    </ul>
                </div>
        </div>
  )
}

export default SideMenu