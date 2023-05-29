import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './pages/layout'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout/>} path='/' >

        </Route>
    )
)

export default router