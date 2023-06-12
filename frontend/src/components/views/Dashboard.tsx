import { UserType } from "../../core/@types"
import { firstLetterCapital } from "../../core/util"
import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom"
import { MdAdd } from "react-icons/md"

export const Title = ({ user }: { user: UserType }) => {
    return (
        <h2 className="text-gray-800 text-xl my-5">
            Welcome, <span className="font-semibold">
                {firstLetterCapital(user!.username)}
            </span>
        </h2>
    )
}

export const TabBar = ({ tab, setTab }: { tab: 'ppty' | 'blogs', setTab: React.Dispatch<React.SetStateAction<'ppty' | 'blogs'>> }) => {
    const selectedTabStyle = "bg-[#ad774e] text-white rounded-t-lg font-semibold"
    return (
        <nav className="flex text-black border-b-2 border-[#ad774e] text-sm justify-between">
            <div>
                <select name="" id="" className="bg-transparent rounded-sm text-sm p-1 pl-0 font-semibold w-24">
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                    <option value="pending">Pending</option>
                    <option value="all" selected>All</option>
                </select>
            </div>
            <div>
                <button
                    onClick={_ => setTab('ppty')}
                    className={twMerge("p-2 py-1", `${tab == 'ppty' && selectedTabStyle}`)}
                > Property Ads
                </button>
                <button
                    onClick={_ => setTab('blogs')}
                    className={twMerge("p-2 py-1", `${tab == 'blogs' && selectedTabStyle}`)}
                > Blogs
                </button>
            </div>
        </nav>
    )
}

export const AddMenu = () => {
    const Item = ({ to, text }: { to: string, text: string }) => {
        return (<li className="py-2">
            <Link
                to={to}
            >
                {text}
            </Link>
        </li>)
    }

    return (
        <ul className="absolute bottom-16 right-10 shadow-lg border-r-2 border-b-2 w-fit p-2 px-5 text-center border-l-2 bg-[#ad774e] text-white text-sm">
            <Item to="/myaccount/new_property" text="New Property" />
            <Item to="/myaccount/new_blog" text="New Blog" />
        </ul>
    )
}

export const AddBtn = ({handleAddMenu}:{handleAddMenu:()=>void}) => {
    return (
        <button 
            onClick={handleAddMenu}
            className="absolute bottom-5 right-5 shadow-sm bg-[#ad774e63] hover:bg-[#ad774e] shadow-[#ad774e] rounded-full p-1 active:scale-95">
            <MdAdd size={30} color='white' />
        </button>
    )
}