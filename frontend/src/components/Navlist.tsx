import { TiHomeOutline } from 'react-icons/ti'
import { GrStatusUnknown } from 'react-icons/gr'
import { MdOutlineFeaturedPlayList } from 'react-icons/md'
import { RiContactsBookLine } from 'react-icons/ri'
import { TfiWrite } from 'react-icons/tfi'

const navItemsCreator = (isSideNav: boolean = false) => {
    if (!isSideNav)
        return ([
            <a href="/" id='home'> Home </a>,
            <a href="#about" id='about'> About </a>,
            <a href="#featured" id='featured'> Featured </a>,
            <a href="#blogs" id='blogs'> Blogs </a>,
            <a href="#contacts" id='contacts'> Contacts </a>
        ])

    return ([
        <a href="/" id='home'>
            <span> <TiHomeOutline size={20}/> </span>
            <span> Home </span>
        </a>,
        <a href="#about" id='about'>
            <span> <GrStatusUnknown size={20}/> </span>
            <span>About</span>
        </a>,
        <a href="#featured" id='featured'>
            <span> <MdOutlineFeaturedPlayList size={20}/> </span>
            <span> Featured </span>
        </a>,
        <a href="#blogs" id='blogs'>
            <span> <TfiWrite size={20}/> </span>
            <span> Blogs </span>
        </a>,
        <a href="#contacts" id='contacts'>
            <span> <RiContactsBookLine size={20}/> </span>
            <span> Contacts </span>
        </a>
    ])
}
const Navlist = ({isSideNav = false, className, ulClass}:
    {
        isSideNav:boolean,
        className?:string, 
        ulClass?:string
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