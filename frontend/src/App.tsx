import './core/__interceptor__'
import { RouterProvider } from "react-router-dom"
import { router } from "./core/router"
import AppCtx from "./context/AppCtx"
import { useState } from "react"
import { UserType } from "./core/@types"
import { refresh } from "./core/auth-request"
import { userTempStorage } from "./core/util"

const App = () => {
  const [user, setUser] = useState<UserType>(null)
  const [isMenuOpen, setMenuOpen] = useState(false)

  refresh((data) => {
    userTempStorage.set(data)
    setUser(data)
  }, (statusCode, reason) => {
    if (statusCode === 403 && reason === 'Expired refresh token')
      alert('Session Expired')
    userTempStorage.remove()
  })

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