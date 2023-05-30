import EstateEliteLogoSrc from '../assets/logo-desktop.svg'
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom'

const MyAccount = () => {
  const location = useLocation()

  const tabHighlighter = 'border-b-2 border-[#B97745] text-[#B97745] text-base font-semibold'
  const tabNotSelected = 'text-gray-700 hover:scale-110'

  const isLoginPane = location.pathname == '/login'
  const isRegisterPane = location.pathname == '/register'

  return (
    <>
      {  <div 
            className="w-full h-screen bg-[#222c] fixed overflow-auto top-0 z-10
                    flex justify-center items-center
                    "
          >
          <div className="bg-[#F2EDE9] w-full mx-8 md:w-[50%] md:max-w-[400px] py-4 rounded-lg relative">
    
              <Link to={'/'}>
                <img src={EstateEliteLogoSrc} alt="" width={'85px'} className="m-auto"/>
              </Link>
              <div className="flex mt-6 justify-between [&>div]:w-1/2 
                              [&>div]:text-center text-sm [&>div]:pb-2 px-4">
                <div 
                    id='login_tab' 
                    className={` ${isLoginPane && tabHighlighter} 
                                ${!isLoginPane && tabNotSelected} 
                                hover:cursor-pointer`}
                    >
                      <Link to={'/login'}>
                          Login 
                      </Link>
                </div>
                <div 
                    id='register_tab' 
                    className={`${isRegisterPane && tabHighlighter} 
                                ${!isRegisterPane && tabNotSelected} 
                                hover:cursor-pointer`}
                    >
                    <Link to={'/register'}>
                          Register 
                      </Link>
                </div>
              </div>
              { isLoginPane &&  <LoginForm/> }
              { isRegisterPane  && <RegisterForm/> }
          </div>
      </div>}
    </>
  )
}

export default MyAccount