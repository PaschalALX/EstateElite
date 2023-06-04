import React from 'react'
import Burger from 'hamburger-react'
import { lightColor } from '../core/@types'

const Hamburger = ({ isMenuOpen, setMenuOpen }: {
    isMenuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <Burger
            color={lightColor.value}
            size={22}
            rounded={true}
            toggled={isMenuOpen}
            toggle={() => setMenuOpen(v => !v)}
        />
    )
}

export default Hamburger