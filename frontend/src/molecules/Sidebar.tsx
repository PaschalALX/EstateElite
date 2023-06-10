import React, { useContext } from "react"
import AppCtx from "../context/AppCtx"
import Logo from "../components/Logo"
import Container from "../components/Container"
import { lightColor } from "../core/@types"
import { CgLogOut } from 'react-icons/cg'
import { RiAccountBoxLine } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'

const Sidebar = ({ page, children , gotoAccount, logoutUser}: React.PropsWithChildren &
{
    page: 'home' | 'account',
    gotoAccount?: () => void,
    logoutUser: () => void
}
) => {
    const { isMenuOpen, user, setMenuOpen } = useContext(AppCtx)

    return (
        <aside
            className={`${!isMenuOpen && 'hidden'}
                          ${lightColor.bg} fixed top-0 left-0 w-[65%] rounded-r-lg
                          h-screen  md:hidden flex flex-col justify-center  z-30`}
        >
            <Logo
                type="desktop"
                className="absolute top-5 left-6"
                width={'85px'}
            />
            <button className="absolute top-8 right-6 text-gray-600 font-semibold" onClick={()=> setMenuOpen(false)}>
                <AiOutlineClose size={28}/>
            </button>
            <Container>
                {children}
                {
                    (page === 'home') &&
                    <button
                        className="bg-[#B97745] p-2  flex items-center m-auto gap-1 px-4 rounded-md relative top-6"
                        style={{ color: '#f1d9c5' }}
                        onClick={gotoAccount}
                    >
                        <span> <RiAccountBoxLine size={20}/> </span>
                        <span> My Account </span>
                    </button>

                }
            </Container>
            {user &&
                <button
                    className="absolute bottom-10 right-10 flex 
                                items-center gap-1 text-[#B97745]"
                    onClick={logoutUser}
                    >
                    <span>logout</span>
                    <CgLogOut />
                </button>
            }
        </aside>
    )
}

export default Sidebar