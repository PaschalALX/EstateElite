import './core/__interceptor__'
import { RouterProvider } from "react-router-dom"
import { router } from "./core/router"
import AppCtx from "./context/AppCtx"
import { useEffect, useState } from "react"
import { UserType } from "./core/@types"
import { Auth } from './core/util'

const App = () => {
  const [user, setUser] = useState<UserType>(Auth.get() as UserType)
  const [isMenuOpen, setMenuOpen] = useState(false)

  const [winScrollY, setWinScrollY] = useState(0)
  const [showFixedHomeBtn, setShowFixedHomeBtn] = useState(false)
  
  useEffect(() => {

      window.onscroll = () => {
        setWinScrollY(window.scrollY)
      }

      if (winScrollY > 300) setShowFixedHomeBtn(true)
      else setShowFixedHomeBtn(false)
  }, [winScrollY])

  const value = {
    isMenuOpen,
    setMenuOpen,
    user,
    setUser,
    showFixedHomeBtn
  }


  return (
    <AppCtx.Provider value={value}>
      <RouterProvider router={router} />
    </AppCtx.Provider>
  )
}

export default App