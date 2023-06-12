import Navbar from "../../molecules/Navbar"
import Hamburger from "../../components/Hamburger"
import { UserType, mainColor } from "../../core/@types"
import React, { useContext } from "react"
import AppCtx from "../../context/AppCtx"
import { NavLink, Outlet } from "react-router-dom"
import { RiDashboard3Fill, RiDeleteBin2Fill } from "react-icons/ri"
import { BsFillHousesFill, BsFilePostFill } from "react-icons/bs"
import { CgLogOut } from "react-icons/cg"
import { Navigate } from "react-router-dom"
import Sidebar from "../../molecules/Sidebar"
import { Auth } from "../../core/util"
import Container from "../../components/Container"
import { deleteAccount, logout, sessionExpired } from "../../core/auth-request"
import { useNavigate, NavigateFunction } from "react-router-dom"

const deleteUser = (
    userId: string,
    setUser: React.Dispatch<React.SetStateAction<UserType>>,
    navigate: NavigateFunction
) => {
    deleteAccount(userId, () => {
        alert('Account deleted successully')
        Auth.remove()
        setUser(null)
        navigate('/')
    }, () => {
        sessionExpired(()=>{
            setUser(null)
            navigate('/login')
        })       
    })
}



const Account = () => {
    const { isMenuOpen, setMenuOpen, user, setUser } = useContext(AppCtx)
    const navigate = useNavigate()


    if (!user) return <Navigate to={'/login'} replace={true} />
    

    const logoutUser = () => {
        logout(() => {
            alert('Logged out')
            setUser(null)
            setMenuOpen(false)
            Auth.remove()
            navigate('/', {replace:true})
        })
    }

    const rightCornerElem = (
        isMenuOpen: boolean,
        setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        return (
            <>
                <div className={`md:flex hidden  md:${mainColor.text}`}>
                    <button onClick={logoutUser}>
                        logout
                    </button>
                </div>

                <button className="md:hidden">
                    <Hamburger
                        size={25}
                        isMenuOpen={isMenuOpen}
                        setMenuOpen={setMenuOpen}
                    />
                </button>
            </>
        )
    }

    const navlinkStyleDesktop = `block mr-3 pl-3 py-2 text-sm hover:cursor-pointer
  rounded-lg my-4 hover:scale-110 flex gap-2 items-center`

    const navlinkStyleMobileSide = 'flex justify-center items-center gap-2 py-1 rounded-lg hover:scale-105 hover:cursor-pointer'


    const dashboardListCreator = (navItemStyle: string ) => {
        return (
            [
                <NavLink
                    className={navItemStyle}
                    to={'/myaccount/dashboard'}
                >
                    <RiDashboard3Fill />
                    <span>My Dashboard</span>
                </NavLink>,
                <NavLink
                    className={`${navItemStyle}`}
                    to={'/myaccount/new_property'}
                >
                    <BsFillHousesFill />
                    <span>Add Property</span>
                </NavLink>,
                <NavLink
                    className={`${navItemStyle}`}
                    to={'/myaccount/new_blog'}
                >
                    <BsFilePostFill />
                    <span>Add Blog</span>
                </NavLink>,
                <a
                    className={`${navItemStyle}`}
                    onClick={logoutUser}
                >
                    <CgLogOut />
                    <span>Logout</span>
                </a>,
                <a
                    className={`${navItemStyle} hover:text-red-500 font-bold`}
                    onClick={() => deleteUser(user.userId, setUser, navigate)}
                >
                    <RiDeleteBin2Fill />
                    <span>Delete Account</span>
                </a>
            ]
        )
    }
    return (
        <>
            <Navbar rightCornerElem={rightCornerElem(isMenuOpen, setMenuOpen)} />
            <Sidebar
                page="account"
                logoutUser={logoutUser}
            >
                <ul>
                    {dashboardListCreator(navlinkStyleMobileSide).map((item, index) => (
                        <li
                            key={index}
                            className="[&>a]:flex [&>a]:gap-2 [&>a]:items-center [&>a]:justify-center [&>a]:text-gray-700 py-3 "
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </Sidebar>

            <Container className="relative z-20">
                <div className="md:flex text-white " style={{ height: 'calc(100vh - 120px)' }}>

                    {/* Desktop View */}
                    <aside className=" p-2 mb-2 md:flex-1 relative hidden md:block">
                        <ul>
                            {dashboardListCreator(navlinkStyleDesktop).map((item, index) => (
                                <li key={index}> {item} </li>
                            ))}
                        </ul>
                    </aside>
                    <main className="md:flex-[3.5] bg-[#F2EDE9] relative overflow-auto md:top-3 md:mr-2 rounded-lg h-dash md:h-auto pt-2 md:pt-0">
                        <Outlet/>
                    </main>
                </div>
            </Container>
        </>
    )
}

export default Account