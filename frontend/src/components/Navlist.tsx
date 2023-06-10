import { TiHomeOutline } from 'react-icons/ti'
import { GrStatusUnknown } from 'react-icons/gr'
import { MdOutlineFeaturedPlayList } from 'react-icons/md'
import { RiContactsBookLine } from 'react-icons/ri'
import { TfiWrite } from 'react-icons/tfi'
import ScrollLink from './ScrollLink'


const navItemsCreator = (isSideNav: boolean = false) => {
    if (!isSideNav)
        return ([
            <ScrollLink to="home"> Home </ScrollLink>,
            <ScrollLink to="featured"> Featured </ScrollLink>,
            <ScrollLink to="blogs"> Blogs </ScrollLink>,
            <ScrollLink to="about"> About </ScrollLink>,
            <ScrollLink to="contacts"> Contacts </ScrollLink>
        ])

    return ([
        <ScrollLink to="home">
            <span> <TiHomeOutline size={20} /> </span>
            <span> Home </span>
        </ScrollLink>,
        <ScrollLink to="featured">
            <span> <MdOutlineFeaturedPlayList size={20} /> </span>
            <span> Featured </span>
        </ScrollLink>,
        <ScrollLink to="blogs">
            <span> <TfiWrite size={20} /> </span>
            <span> Blogs </span>
        </ScrollLink>,
        <ScrollLink to="about">
            <span> <GrStatusUnknown size={20} /> </span>
            <span>About</span>
        </ScrollLink>,
        <ScrollLink to="contacts">
            <span> <RiContactsBookLine size={20} /> </span>
            <span> Contacts </span>
        </ScrollLink>
    ])
}
const Navlist = ({ isSideNav = false, className, ulClass }:
    {
        isSideNav: boolean,
        className?: string,
        ulClass?: string
    }) => {
    return (
        <ul className={ulClass}>
            {
                navItemsCreator(isSideNav).map((item, index) => (
                    <li
                        key={index}
                        className={className}
                    >
                        {item}
                    </li>
                ))
            }
        </ul>
    )
}

export default Navlist