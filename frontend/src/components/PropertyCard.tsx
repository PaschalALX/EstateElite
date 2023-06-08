import { Link } from "react-router-dom"
import { firstLetterCapital, shortenWords } from "../core/util"
import { AiFillCamera, AiFillStar } from "react-icons/ai"
import { MdLocationPin } from "react-icons/md"
import { HiUserCircle } from "react-icons/hi"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"


const PropertyCard = ({
    id, category, imageURLs, title, description, state, price, username, userId, isFeatured,
    createdAt
}: {
    id: string,
    category: string,
    imageURLs: string[],
    title: string,
    description: string,
    isFeatured: boolean,
    state: string,
    price: string,
    username: string,
    userId: string,
    createdAt: string

}) => {
    dayjs.extend(relativeTime)
    price = parseFloat(price).toLocaleString('en-US')
    category = firstLetterCapital(category)
    createdAt = dayjs('2023-06-06T17:19:47Z').fromNow()


    return (<div className="relative mx-auto w-[90%]">

        <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">

            <div className="rounded-lg bg-white p-4 shadow-gray-400 shadow-lg">
                <Link to ={id} className="relative flex h-52 justify-center overflow-hidden rounded-lg">
                    <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                        <div className="absolute inset-0 bg-black bg-opacity-80">
                            <img src={imageURLs[0]} alt="" />
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

                    <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#B97745] px-2 py-1 text-xs font-semibold text-white"> {category} </span>
                    {isFeatured && <span className="absolute bottom-0 right-2 z-10 mb-3 mr-3 text-white">
                        <AiFillStar size={25} />
                    </span>}
                    <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white"> <i className="fa fa-star"></i> </span>
                </Link>


                <div className=" my-5 text-gray-700">
                    <h1 className="font-bold text-xl text-[#B97745] mb-2"> {title} </h1>
                    <p className="text-sm text-justify"> {shortenWords(description)}  </p>
                    <div className="flex justify-between my-3 text-lg">
                        <p className="flex items-center font-semibold">
                            <MdLocationPin size={20} />
                            {state}
                        </p>
                        <p className="inline-flex items-center text-lg font-semibold">
                            &#8358;
                            {price}
                        </p>
                    </div>
                    <div className="flex justify-between items-center text-xs -mb-5 pt-1">
                        <a href={userId} className="flex items-center font-semibold text-[#B97745] gap-x-1">
                            <HiUserCircle size={20} /> {username}
                        </a>
                        <span> Posted {createdAt} </span>
                    </div>
                </div>

            </div>
        </div>
    </div>)
}

export default PropertyCard