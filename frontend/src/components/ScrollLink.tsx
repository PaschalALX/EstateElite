import { Link,  } from 'react-scroll'
import React from 'react'

const ScrollLink = ({ to, children, className }: React.PropsWithChildren & { to: string, className?: string}) => {
    return (
        <Link
            to={to}
            smooth={true}
            duration={1000}
            activeClass='scroll_active'
            spy={true}
            offset={-20}
            className={className}
        >
            {children}
        </Link>
    )
}

export default ScrollLink