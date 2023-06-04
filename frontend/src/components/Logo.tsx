import { Link } from "react-router-dom"
import LogoDesktopSrc from "../assets/logo-desktop.svg"
import LogoMobileSrc from "../assets/logo-mobile.svg"

type LogoType = {
    type: 'desktop' | 'mobile',
    width?: string,
    className?: string,
    alt?: string
}

export const NavLogo = () => {
    return (
        <Link
            to={"/"}
        >        <img
                src={LogoDesktopSrc}
                width={"120px"}
                alt={''}
                className="hidden md:block"
            />
            <img
                src={LogoMobileSrc}
                width={"100px"}
                alt={''}
                className="md:hidden"
            />
        </Link>
    )
}

const Logo = ({ type, alt, className, width }: LogoType) => {
    return (
        <Link
            to={"/"}
        >
            {
                type === "desktop" &&
                <img
                    src={LogoDesktopSrc}
                    width={width ?? "120px"}
                    alt={alt}
                    className={className}
                />
            }
            {
                type === "mobile" &&
                <img
                    src={LogoMobileSrc}
                    width={width ?? "90px"}
                    alt={alt}
                    className={className}
                />
            }
        </Link>
    )
}

export default Logo