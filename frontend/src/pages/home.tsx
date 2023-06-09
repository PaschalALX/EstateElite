import { useContext } from "react"
import Navbar from "../molecules/Navbar"
import Sidebar from "../molecules/Sidebar"
import Hamburger from "../components/Hamburger"
import AppCtx from "../context/AppCtx"
import Navlist from "../components/Navlist"
import { mainColor } from "../core/@types"
import { Outlet } from "react-router-dom"
import { CgLogOut } from "react-icons/cg"
import { refresh, logout } from "../core/auth-request"
import { useNavigate } from "react-router-dom"
import { Auth } from "../core/util"
import LandingComponent from "../molecules/home/LandingComponent"
import SecondSection from "../molecules/home/SecondSection"

const Home = () => {
    const { user, setUser, isMenuOpen, setMenuOpen } = useContext(AppCtx)
    const navigate = useNavigate()

    const gotoAccount = () => {
        refresh((data) => {
            setUser(data)
            Auth.set(data)
            navigate('/myaccount/dashboard')
            setMenuOpen(false)
        },
            () => {
                if (Auth.isSet())
                    alert('Session Expired')
                navigate('/login')
                setUser(null)
                Auth.remove()
                setMenuOpen(false)
            }
        )
    }

    const logoutUser = () => {
        logout(() => {
            alert('Logged out')
            setUser(null)
            setMenuOpen(false)
            Auth.remove()
        })
    }

    const rightCornerElem = (
        isMenuOpen: boolean,
        setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        return (
            <>
                <div className={`md:flex hidden items-center gap-2 md:text-[#B97745]`}>
                    <button
                        onClick={gotoAccount}
                    >
                        My Account
                    </button>
                    {
                        user &&
                        <button
                            onClick={logoutUser}
                        >
                            <CgLogOut />
                        </button>}
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
    return (
        <>
            <Navbar rightCornerElem={rightCornerElem(isMenuOpen, setMenuOpen)}>
                <Navlist
                    isSideNav={false}
                    className={`ml-4 text-sm font-semibold ${mainColor.hoverText}`}
                    ulClass="md:flex hidden" />
            </Navbar>
            <Outlet />
            <LandingComponent/>
            <SecondSection/>
            <Sidebar page="home" gotoAccount={gotoAccount} logoutUser={logoutUser}>
                <Navlist
                    isSideNav={true}
                    className="[&>a]:flex [&>a]:gap-2 [&>a]:items-center [&>a]:justify-center [&>a]:text-gray-700 py-3 "
                    ulClass="mr-4"
                />
            </Sidebar>
        </>
    )
}

export default Home