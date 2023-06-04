import Navbar from "../molecules/Navbar"
import Hamburger from "../components/Hamburger"
import { UserType, mainColor } from "../core/@types"
import React, { useContext } from "react"
import AppCtx from "../context/AppCtx"
import { NavLink } from "react-router-dom"
import { RiDashboard3Fill, RiDeleteBin2Fill } from "react-icons/ri"
import { BsFillHousesFill, BsFilePostFill } from "react-icons/bs"
import { CgLogOut } from "react-icons/cg"
import { Navigate } from "react-router-dom"
import Sidebar from "../molecules/Sidebar"
import { firstLetterCapital, userTempStorage } from "../core/util"
import Container from "../components/Container"
import { deleteAccount, logout } from "../core/auth-request"
import { axiosInstance } from "../core/axios.conf"
import { useNavigate, NavigateFunction } from "react-router-dom"

const deleteUser = (
    userId: string,
    setUser: React.Dispatch<React.SetStateAction<UserType>>,
    navigate: NavigateFunction
) => {
    deleteAccount(userId, () => {
        alert('Account deleted successully')
        userTempStorage.remove()
        setUser(null)
    }, () => {
        alert('Session Expired')
        userTempStorage.remove()
        setUser(null)
        navigate('/')
    })
}


const Account = () => {
    const { isMenuOpen, setMenuOpen, user, setUser } = useContext(AppCtx)
    const navigate = useNavigate()

    if (!user)
        return <Navigate to={'/'} replace={true} />

    const logoutUser = () => {
        logout(() => {
            alert('Logged out')
            setUser(null)
            setMenuOpen(false)
            userTempStorage.remove()
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
                        isMenuOpen={isMenuOpen}
                        setMenuOpen={setMenuOpen}
                    />
                </button>
            </>
        )
    }

    const navlinkStyleDesktop = `block mr-3 pl-3 py-2 text-sm hover:cursor-pointer
  rounded-lg my-4 hover:scale-110 flex gap-2 items-center`
    const navLinkSelectedStyle = 'bg-[#ad774e] border-[#ad774e] font-bold'

    const navlinkStyleMobileSide = 'flex justify-center items-center gap-2 py-1 rounded-lg hover:scale-105 hover:cursor-pointer'
    const navlinkStyleMobileBottom = "hover:cursor-pointer hover:text-[#ad774e]"
    const navLinkSelectedStyleMobileBottom = 'font-bold text-[#ad774e] text-4xl'

    const isDashboardActive = location.pathname === '/myaccount/dashboard'

    const dashboardListCreator = (navItemStyle: string,
        navLinkSelectedStyle: string,
        isBtmFixed: boolean
    ) => {
        return (
            [
                <NavLink
                    className={`${navItemStyle} ${isDashboardActive && navLinkSelectedStyle}`}
                    to={'/myaccount/dashboard'}
                >
                    <RiDashboard3Fill />
                    {!isBtmFixed && <span>My Dashboard</span>}
                </NavLink>,
                <NavLink
                    className={`${navItemStyle}`}
                    to={'/myaccount/properties'}
                >
                    <BsFillHousesFill />
                    {!isBtmFixed && <span>My Property Listings</span>}
                </NavLink>,
                <NavLink
                    className={`${navItemStyle}`}
                    to={'/myaccount/blogs'}
                >
                    <BsFilePostFill />
                    {!isBtmFixed && <span>My Blogs</span>}
                </NavLink>,
                <a
                    className={`${navItemStyle}`}
                    onClick={logoutUser}
                >
                    <CgLogOut />
                    {!isBtmFixed && <span>Logout</span>}
                </a>,
                <a
                    className={`${navItemStyle} hover:text-red-500 font-bold`}
                    onClick={()=>deleteUser(user.userId, setUser, navigate)}
                >
                    <RiDeleteBin2Fill />
                    {!isBtmFixed && <span>Delete Account</span>}
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
                    {dashboardListCreator(navlinkStyleMobileSide, navLinkSelectedStyle, false).map((item, index) => (
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
                            {dashboardListCreator(navlinkStyleDesktop, navLinkSelectedStyle, false).map((item, index) => (
                                <li key={index}> {item} </li>
                            ))}
                        </ul>
                    </aside>
                    <main className=" md:flex-[3.5] bg-[#F2EDE9] relative md:top-3 md:mr-2 rounded-2xl">
                        <h2 className="text-gray-800 text-xl m-5">
                            Welcome, <span className="font-semibold">
                                {firstLetterCapital(user.username)}
                            </span>
                        </h2>
                        <div>
                            <button onClick={() => {
                                axiosInstance.get('/api/protected')
                                    .then((v) => {
                                        console.log(v.data)
                                    })
                                    .catch((e) => {
                                        setUser(null)
                                        userTempStorage.remove()
                                        console.log(e.message)
                                        alert('Session Expired')
                                    })
                            }}>
                                test link
                            </button>
                        </div>
                    </main>

                    {/* Mobile View */}
                    <aside className="fixed md:hidden bottom-2 right-0 left-0">
                        <ul className="flex justify-evenly items-center text-2xl text-white">
                            {dashboardListCreator(navlinkStyleMobileBottom, navLinkSelectedStyleMobileBottom, true).map((item, index) => (
                                <li
                                    key={index}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </Container>
        </>
    )
}

export default Account