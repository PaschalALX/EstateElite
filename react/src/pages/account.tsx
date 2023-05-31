import { useContext } from "react"
import { appCtx } from "../context/appCtx"
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom"
import { CgLogOut } from "react-icons/cg"
import { RiDeleteBin2Fill, RiDashboard3Fill } from "react-icons/ri"
import { BsFilePostFill, BsFillHousesFill } from "react-icons/bs"

const Account = () => {
  const {user, setUser} = useContext(appCtx)
  const location = useLocation()
  const navigate = useNavigate()

  if (!user)
    return <Navigate to={'/login'} replace={true}/>
  
  
  const navlinkStyle = `block mr-3 pl-3 py-2 text-sm hover:cursor-pointer
                        rounded-lg my-4 hover:scale-110 flex gap-2 items-center`
  const navLinkSelectedStyle = 'bg-[#ad774e] border-[#ad774e] font-bold hover:scale-100'
  const isDashboardActive = location.pathname == '/myaccount/dashboard'
  
  const logoutAccount = () => {
    setUser(null)
    navigate('/')
  }
  
  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account?'))
    {
      setUser(null)
      navigate('/')
    }
  }
  
  return (
    <div className="md:flex text-white " style={{ height: 'calc(100vh - 120px)' }}>
      {/* Desktop View */}
      <aside className=" p-2 mb-2 md:flex-1 relative hidden md:block">

        <div>
          <NavLink
            className={`${navlinkStyle} ${isDashboardActive && navLinkSelectedStyle}`}
            to={'/myaccount/dashboard'}
          >
            <RiDashboard3Fill/>
            <span>My Dashboard</span>
          </NavLink>
          <NavLink
            className={navlinkStyle}
            to={'/myaccount/properties'}
          >
            <BsFillHousesFill/>
           <span>My Property Listings</span>
          </NavLink>
          <NavLink
            className={navlinkStyle}
            to={'/myaccount/blogs'}
          >
            <BsFilePostFill/>
            <span>My Blogs</span>
          </NavLink>
            <a
              className={`${navlinkStyle}`}
              onClick={logoutAccount}
              >
                <CgLogOut/>
              <span>Logout</span>
            </a>
            <a
              className={`${navlinkStyle} hover:text-red-500 font-bold`}
              onClick={deleteAccount}
              >
                <RiDeleteBin2Fill/>
              <span>Delete Account</span>
            </a>
        </div>

      </aside>
      
      <main className=" md:flex-[3.5] bg-[#F2EDE9] relative md:top-3 md:mr-2 rounded-2xl">
          <h2 className="text-gray-800 text-xl m-5"> Welcome,  <span className="font-semibold">{ user.username }</span></h2>
      </main>

      {/* Mobile View */}
      <aside className="fixed md:hidden bottom-0 right-0 left-0">

        <div className="flex justify-evenly">
          <NavLink
            to={'/myaccount/dashboard'}
          >
            <RiDashboard3Fill/>
          </NavLink>
          <NavLink
            to={'/myaccount/properties'}
          >
            <BsFillHousesFill/>
          </NavLink>
          <NavLink
            to={'/myaccount/blogs'}
          >
            <BsFilePostFill/>
          </NavLink>
            <a
              onClick={logoutAccount}
              >
                <CgLogOut/>
            </a>
            <a
              onClick={deleteAccount}
              >
                <RiDeleteBin2Fill/>
            </a>
        </div>

      </aside>
    </div>
  )
}

export default Account