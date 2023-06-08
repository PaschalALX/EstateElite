import React from 'react'
import Burger from 'hamburger-react'
import { lightColor } from '../core/@types'

const Hamburger = ({ size, isMenuOpen, setMenuOpen }: {
    size: number,
    isMenuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <Burger
            color={lightColor.value}
            size={size}
            rounded={true}
            toggled={isMenuOpen}
            toggle={() => setMenuOpen(v => !v)}
        />
    )
}

export default Hamburger