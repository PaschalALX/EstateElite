import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './pages/layout'
import SignUpLogIn from './pages/signupLogin'
import Dashboard from './pages/account'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route element={<Layout/>} path='/'>
            <Route element={<SignUpLogIn/>} path='login'> </Route>
            <Route element={<SignUpLogIn/>} path='register'> </Route>
            <Route element={<Dashboard/>} path={'/myaccount/dashboard'}/>
        </Route>
        </>
    )
)

export default router