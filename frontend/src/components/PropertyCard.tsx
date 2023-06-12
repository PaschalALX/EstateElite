import { Link } from "react-router-dom"
import { firstLetterCapital } from "../core/util"
import { AiFillCamera } from "react-icons/ai"
import { MdLocationPin } from "react-icons/md"
import React from "react"


const PropertyCard = ({
    id, category, imageURLs, title, state, price, extra
}: {
    id: string,
    category: string,
    imageURLs: string[],
    title: string,
    state: string,
    price: string,
    username: string,
    userId: string,
    createdAt: string,
    extra?: React.ReactNode

}) => {
    price = parseFloat(price).toLocaleString('en-US')
    category = firstLetterCapital(category)


    return (<div className="relative mx-auto w-[90%]">

        <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">

            <div className="rounded-lg bg-white p-2 shadow-gray-400 shadow-lg">
                <Link to={id}>
                    <div className="relative flex h-40 justify-center overflow-hidden rounded-lg">
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
                        <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white"> <i className="fa fa-star"></i> </span>

                    </div>

                    <div className=" my-2 text-gray-700 px-1">
                        <h1 className="font-semibold text-lg mb-2"> {title} </h1>
                        <div className="flex justify-between my-3 text-base">
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
                </Link>
                {extra}
            </div>
        </div>
    </div>)
}

export default PropertyCard