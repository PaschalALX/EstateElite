import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './pages/layout'
import MyAccount from './pages/myAccount'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout/>} path='/'>
            <Route element={<MyAccount/>} path='login'> </Route>
            <Route element={<MyAccount/>} path='register'> </Route>
        </Route>
    )
)

export default router