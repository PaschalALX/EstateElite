import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"
import Layout from "../pages/layout"
import Home from "../pages/home"
import SignupLogin from "../molecules/SignupLogin"
import Account from "../pages/account"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="" element={<Home/>}>
                <Route path="register" element={<SignupLogin/>}/>
                <Route path="login" element={<SignupLogin/>}/>
            </Route>
            <Route path="myaccount/dashboard" element={<Account/>}/>
        </Route>
    )
)