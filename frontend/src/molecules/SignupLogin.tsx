import { useLocation } from "react-router-dom"
import Logo from "../components/Logo"
import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"

const SignupLogin = () => {
    const location = useLocation()

    const tabHighlighter = 'border-b-2 border-[#B97745] text-[#B97745] text-base font-semibold'
    const tabNotSelected = 'text-gray-700 hover:scale-110'

    const isLoginPane = location.pathname == '/login'
    const isRegisterPane = location.pathname == '/register'
    return (
        <div
            className="w-full h-screen bg-[#222c] fixed overflow-auto top-0 left-0 z-30
                    flex justify-center items-center
                    "
        >
            <div className="bg-[#F2EDE9] w-full mx-8 md:w-[50%] md:max-w-[400px] py-4 rounded-lg relative">
                <Logo type="desktop" className="m-auto" width="85px" />
                <div className="flex mt-6 justify-between [&>div]:w-1/2 
                              [&>div]:text-center text-sm [&>div]:pb-2 px-4">
                    <div
                        id='login_tab'
                        className={` ${isLoginPane && tabHighlighter} 
                                ${!isLoginPane && tabNotSelected} 
                                hover:cursor-pointer`}
                    >
                        <Link to={'/login'} replace={true}>
                            Login
                        </Link>
                    </div>
                    <div
                        id='register_tab'
                        className={`${isRegisterPane && tabHighlighter} 
                                ${!isRegisterPane && tabNotSelected} 
                                hover:cursor-pointer`}
                    >
                        <Link to={'/register'} replace={true}>
                            Register
                        </Link>
                    </div>
                </div>
                { isLoginPane &&  <LoginForm/> }
              { isRegisterPane  && <SignupForm/> }
            </div>
        </div>
    )
}

export default SignupLogin