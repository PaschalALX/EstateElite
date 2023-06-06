import { twMerge } from "tailwind-merge"
import { mainColor } from "../../core/@types"

const btnStyle = twMerge(`px-16 py-1 font-medium text-lg text-white bg-transparent border border-white focus:z-10 focus:bg-[#B97745] focus:scale-110 basis-1/2`)

const LandingComponent = () => {
    return (
        <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-full flex justify-center text-white text-center mt-8 md:scale-105'>
            <div>
                <h1 className='text-3xl mb-10'>Find your new property</h1>
                <div className="flex mb-3" role="group">
                    <button type="button" className={btnStyle}>
                        Buy
                    </button>
                    <button type="button" className={btnStyle}>
                        Rent
                    </button>
                </div>
                <div>
                    <form action="">
                    <div className="flex gap-4 mb-3 mt-5 text-sm ">
                            <div className="flex flex-col basis-1/2">
                                <label htmlFor="state" className="mb-0.5"> State </label>
                                <select id="state" className="text-gray-700 p-1" value={'Abuja'}>
                                    <option value="Abuja" selected> Abuja </option>
                                </select>
                            </div>
                            <div className="flex flex-col basis-1/2">
                                <label htmlFor="min_price" className="mb-0.5"> Min price </label>
                                <select id="min_price" className="text-gray-700 p-1" value={'100000'}>
                                    <option value="no_min" selected> No Min </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-4 mb-3 text-sm">
                            <div className="flex flex-col basis-1/2">
                                <label htmlFor="cateogory" className="mb-0.5"> Cateogory </label>
                                <select id="cateogory" className="text-gray-700 p-1" value={'Abuja'}>
                                    <option value="land" selected> Land </option>
                                </select>
                            </div>
                            <div className="flex flex-col basis-1/2">
                                <label htmlFor="max_price" className="mb-0.5"> Max price </label>
                                <select id="max_price" className="text-gray-700 p-1" value={'100000'}>
                                    <option value="no_max" selected> No Max </option>
                                </select>
                            </div>
                        </div>
                        <button className={twMerge(mainColor.bg, 'w-1/2 mt-5 py-2')}>
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LandingComponent