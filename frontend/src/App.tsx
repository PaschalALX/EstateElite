import './core/__interceptor__'
import { RouterProvider } from "react-router-dom"
import { router } from "./core/router"
import AppCtx from "./context/AppCtx"
import { useState } from "react"
import { UserType } from "./core/@types"
import { Auth } from './core/util'

const App = () => {
  const [user, setUser] = useState<UserType>(Auth.get() as UserType)
  const [isMenuOpen, setMenuOpen] = useState(false)

  const value = {
    isMenuOpen,
    setMenuOpen,
    user,
    setUser
  }


  return (
    <AppCtx.Provider value={value}>
      <RouterProvider router={router} />
    </AppCtx.Provider>
  )
}

export default App