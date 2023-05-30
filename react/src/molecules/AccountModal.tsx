import { useContext } from "react"
import { appCtx } from "../context/appCtx"
import EstateEliteLogoSrc from '../assets/logo-desktop.svg'
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"
import { IoMdClose } from "react-icons/io"

const AccountModal = () => {
  const {
          isAccountModalOpen,
          setAccountModalOpen,
          accountPaneSelect,
          setAccountPaneSelect
        } = useContext(appCtx)

  const tabHighlighter = 'border-b-2 border-[#B97745] text-[#B97745] text-base'
  const tabNotSelected = 'text-gray-700 hover:scale-110'
  const paneSwitcher = (e:React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.id == 'register_tab')
      setAccountPaneSelect('register')
    else setAccountPaneSelect('login')
  }
  const isLoginPane = accountPaneSelect == 'login'
  const isRegisterPane = accountPaneSelect == 'register'

  const closeAccountModal = (e:React.MouseEvent<HTMLElement>) => {
    const currentTarget = e.currentTarget as HTMLElement
    
      console.log(e.currentTarget)
      if (currentTarget.matches('.exit')){
          setAccountModalOpen(false)
      }
  }
  return (
    <>
      {  isAccountModalOpen && <div 
          className="w-full h-screen bg-[#222c] fixed overflow-auto top-0 z-10
                    flex justify-center items-center
                    "
          >
          <div className="bg-[#F2EDE9] w-full mx-8 md:w-[50%] md:max-w-[400px] py-4 rounded-lg relative">
              
              <button 
                  className="text-red-300 absolute top-4 right-4 exit hover:scale-90 shadow-sm rounded-[50%] p-1"
                  onClick={closeAccountModal}
                  >
                  <IoMdClose size='25'/>
              </button>
              <img src={EstateEliteLogoSrc} alt="" width={'85px'} className="m-auto"/>
              <div className="flex mt-6 justify-between [&>div]:w-1/2 
                              [&>div]:text-center text-sm [&>div]:pb-2 px-4">
                <div 
                    id='login_tab' 
                    className={` ${isLoginPane && tabHighlighter} 
                                ${!isLoginPane && tabNotSelected} 
                                hover:cursor-pointer`}
                    onClick={(e)=>paneSwitcher(e)}
                    >
                    Login 
                </div>
                <div 
                    id='register_tab' 
                    className={`${isRegisterPane && tabHighlighter} 
                                ${!isRegisterPane && tabNotSelected} 
                                hover:cursor-pointer`}
                    onClick={(e)=>paneSwitcher(e)}
                    >
                    Register
                </div>
              </div>
              { isLoginPane &&  <LoginForm/> }
              { isRegisterPane  && <RegisterForm/> }
          </div>
      </div>}
    </>
  )
}

export default AccountModal