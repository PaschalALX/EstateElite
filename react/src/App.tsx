import { RouterProvider } from "react-router-dom"
import router from "./router"
import AppCtxProvider from "./context/context"

const App = () => {

  return (
    <AppCtxProvider>
        <RouterProvider router={router}/>
    </AppCtxProvider>
  )
}

export default App