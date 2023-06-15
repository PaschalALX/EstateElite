import { Link } from "react-router-dom"
import { firstLetterCapital, joinToBaseURL } from "../core/util"
import { AiFillCamera } from "react-icons/ai"
import { MdLocationPin } from "react-icons/md"
import { BsTrash } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import { CgRemove, CgUser } from "react-icons/cg"
import { twMerge } from "tailwind-merge"


const PropertyCard = ({
    id, category, imageURLs, title, state, price, username, isUserAccount, status, isAdminAccount,
    squeeze, handleDelete, handleDecline, handleApprove
}: {
    id: string,
    category: string,
    imageURLs: string[],
    title: string,
    state: string,
    price: string,
    username?: string,
    status?: 'approved' | 'declined' | 'pending',
    isUserAccount?: boolean,
    isAdminAccount?: boolean,
    squeeze?: boolean,
    handleDelete?: (id: string) => void,
    handleDecline?: (id: string) => void,
    handleApprove?: (id: string) => void,
}) => {
    const _status = status === 'approved' ? 'active' : status
    price = parseFloat(price).toLocaleString('en-US')
    category = firstLetterCapital(category)
    return (
        <>
            <div className={twMerge("relative mx-auto w-[90%]", squeeze && 'w-[96%]')}>

                <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">

                    <div className="rounded-lg bg-white p-2 shadow-gray-400 shadow-lg">
                        <Link to={id}>
                            <div className={twMerge("relative flex h-40 justify-center overflow-hidden rounded-lg", squeeze && 'h-[88px]')}>
                                <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                                    <div className="absolute inset-0 bg-black bg-opacity-80">
                                        <img src={joinToBaseURL(imageURLs[0], false)} alt="" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-5 mb-3 flex">
                                    <p className="flex items-center gap-1 font-medium text-white shadow-sm">
                                        <AiFillCamera size={20} />
                                        {imageURLs.length}
                                    </p>
                                </div>
                                <div className="absolute bottom-0 right-5 mb-3 flex">
                                    <p className="flex items-center font-medium text-gray-800">
                                        <i className="fa fa-heart mr-2 text-2xl text-white"></i>
                                    </p>
                                </div>
                                <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white"> <i className="fa fa-star"></i> </span>

                            </div>

                            <div className=" my-2 text-gray-700 px-1">
                                <h1 className={twMerge("font-semibold mb-2", squeeze && 'text-sm')}> {title} </h1>
                                <div className={twMerge("flex justify-between my-3 text-sm", squeeze && 'flex-col text-xs')}>
                                    <p className="flex items-center ">
                                        <MdLocationPin size={20} />
                                        {state}
                                    </p>
                                    <p className="inline-flex items-center font-semibold">
                                        &#8358;
                                        {price}
                                    </p>
                                </div>
                            </div>
                            {(isUserAccount || isAdminAccount) && <span
                                className={`float-right text-xs font-semibold mr-1 -mt-3 
                                            ${_status == 'active' && 'text-green-600'}
                                            ${_status == 'declined' && 'text-red-600'}
                                            ${_status == 'pending' && 'text-yellow-600'}`
                                }>
                                {_status}
                            </span>
                            }
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative -top-[6px]">
                {isUserAccount && !isAdminAccount && <div className="border-t-2 relative mx-auto w-[90%] rounded-lg bg-white p-2 shadow-gray-400 shadow-lg mt-1 flex justify-center">
                    <button title="delete" onClick={() => handleDelete!(id)}>
                        <BsTrash color='red' />
                    </button>
                </div>}

                {isAdminAccount && status === 'pending' && <div className="border-t-2 relative mx-auto w-[90%] rounded-lg bg-white p-2 shadow-gray-400 shadow-lg mt-1 flex justify-between">
                    <span className="flex items-center text-black text-sm">
                        <CgUser /> {firstLetterCapital(username as string)}
                    </span>
                    <div className="flex items-center">
                        <button title="decline" onClick={_ => handleDecline!(id)}>
                            <CgRemove color='red' size={25} />
                        </button>
                        <button title="approve" className="ml-2" onClick={_ => handleApprove!(id)}>
                            <TiTick color='green' size={25} />
                        </button>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default PropertyCard