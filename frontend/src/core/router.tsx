import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"
import Layout from "../pages/layout"
import Home from "../pages/home"
import SignupLogin from "../molecules/SignupLogin"
import Account from "../pages/account"
import Dashboard from "../pages/account/dashboard"
import NewProperty from "../pages/account/newProperty"
import ServiceUnavailable from "../pages/NoticePage"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />}>
                <Route path="register" element={<SignupLogin />} />
                <Route path="login" element={<SignupLogin />} />
            </Route>
            <Route path="myaccount" element={<Account />}>
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="new_property" element={<NewProperty/>} />
                <Route path="new_blog" element={<ServiceUnavailable/>} />
            </Route>
        </Route>
    )
)