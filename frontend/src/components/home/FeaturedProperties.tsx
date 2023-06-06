import { Link } from "react-router-dom"
import { firstLetterCapital, shortenWords } from "../../core/util"
import { AiFillCamera, AiFillGithub, AiFillStar } from "react-icons/ai"
import { MdLocationPin } from "react-icons/md"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

const testProperties = [
    {
        id: '1',
        title: 'Title One',
        username: 'Pasmac',
        githubURL: 'pasmac',
        description: 'Description One',
        state: 'Kaduna',
        price: '17000000',
        category: "Commercial Property for Sale",
        imageURLs: [
            "https://assets.entrepreneur.com/content/3x2/2000/20150622231001-for-sale-real-estate-home-house.jpeg?crop=16:9",
            "image_two",
            "image_three"
        ],
        createdAt: '2023-06-06T17:19:47Z',
        isFeatured: true
    },
    {
        id: '2',
        title: 'Title Two',
        username: 'Pasmac',
        githubURL: 'pasmac',
        description: 'Description Two',
        state: 'Enugu',
        price: '870000',
        category: "Houses & Apartments for Rent",
        imageURLs: [
            "https://assets.entrepreneur.com/content/3x2/2000/20150622231001-for-sale-real-estate-home-house.jpeg?crop=16:9",
            "image_two",
            "image_three",
            "image_four",
            "image_five"
        ],
        createdAt: '2023-06-06T17:19:47Z',
        isFeatured: true
    },
    {
        id: '3',
        title: 'Title Three',
        username: 'Eze',
        githubURL: 'eze',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam tenetur vero repellendus impedit exercitationem. Nihil incidunt accusantium deserunt excepturi! Laudantium possimus rerum inventore repellat adipisci sequi doloribus vero nulla debitis ex iste, ratione alias corporis, numquam distinctio, excepturi pariatur porro temporibus incidunt eum voluptate. Doloremque nihil accusantium minima tempore veritatis libero incidunt dolor ratione exercitationem totam eligendi sint tempora porro eos repudiandae quos, impedit accusamus ab, ut facere commodi. Vero unde accusamus, tenetur, omnis assumenda, dolorum voluptatibus reiciendis dignissimos veritatis in suscipit quibusdam perferendis est ut fugiat voluptates. Similique architecto voluptatibus obcaecati tenetur nam esse consequuntur saepe necessitatibus quaerat unde.',
        state: 'Lagos',
        price: '98000000',
        category: "Land & Plots for Sale",
        imageURLs: [
            "https://assets.entrepreneur.com/content/3x2/2000/20150622231001-for-sale-real-estate-home-house.jpeg?crop=16:9",
            "image_two",
            "image_three"
        ],
        createdAt: '2023-06-06T17:19:47Z',
        isFeatured: true
    },

]

const PropertyCard = ({
    id, category, imageURLs, title, description, state, price, username, githubURL, isFeatured,
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
    githubURL: string,
    createdAt: string

}) => {
    dayjs.extend(relativeTime)
    price = parseFloat(price).toLocaleString('en-US')
    category = firstLetterCapital(category)
    createdAt = dayjs('2023-06-06T17:19:47Z').fromNow()


    return (<div className="relative mx-auto w-full " key={id}>

        <Link to='/' className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">

            <div className="rounded-lg bg-white p-4 shadow">
                <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
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
                </div>


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
                    <div className="flex justify-between text-xs -mb-5 pt-1">
                         {createdAt} <a href={githubURL} className="flex items-center underline text-[#B97745] ">
                            <AiFillGithub size={20} />
                            {username}
                        </a>
                    </div>
                </div>

            </div>
        </Link>
    </div>)
}
const FeaturedProperties = () => {
    return (
        <div>
            <h1 className="text-center font-bold text-2xl text-gray-700 my-10">
                Featured Properties
            </h1>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {
                    testProperties.map((ppty) => (
                        <PropertyCard
                            id={ppty.id}
                            category={ppty.category}
                            imageURLs={ppty.imageURLs}
                            title={ppty.title}
                            description={ppty.description}
                            price={ppty.price}
                            state={ppty.state}
                            username={ppty.username}
                            githubURL={ppty.githubURL}
                            isFeatured={ppty.isFeatured}
                            createdAt={ppty.createdAt}
                        />
                    ))
                }
            

            </div>
        </div>
    )
}

export default FeaturedProperties