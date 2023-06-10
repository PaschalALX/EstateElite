import React from "react"
import Container from "../components/Container"
import { NavLogo } from "../components/Logo"

type NavbarType = React.PropsWithChildren & {
    rightCornerElem: React.ReactNode
}
const Navbar = ({ rightCornerElem, children }:NavbarType) => {
  return (
    <nav
        className="h-14 md:h-20 flex items-center py-4 pb-[75px] sticky top-0"
    >
        <Container className="flex items-center justify-between">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <NavLogo/>
                </div>
                <div className="relative top-[.95em]">
                    { children }
                </div>
            </div>
            <div className="relative md:top-[.9em] top-[.6em]">
                { rightCornerElem }
            </div>
        </Container>
    </nav>
  )
}

export default Navbar