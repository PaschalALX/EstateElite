import PropertyCard from "../../components/PropertyCard"
import ViewTitle from "../../components/ViewTitle"
import { PropertyCardType } from "../../core/@types"

const testProperties: PropertyCardType[] = [
    {
        id: '1',
        title: 'Title One',
        username: 'Pasmac',
        status: 'approved',
        state: 'Kaduna',
        price: '17000000',
        category: "Commercial Property for Sale",
        imageURLs: [
            "https://wp-tid.zillowstatic.com/bedrock/app/uploads/sites/43/GettyImages-172318681-047ca2-1400x933.jpg",
            "image_two",
            "image_three"
        ],
    },
    
    {
        id: '2',
        title: 'Title Two Lorem ipsum dolor sit amet consectetur',
        username: 'Pasmac',
        status: 'pending',
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
    },
    {
        id: '3',
        title: 'Title Three',
        username: 'Eze',
        status: 'approved',
        state: 'Lagos',
        price: '98000000',
        category: "Land & Plots for Sale",
        imageURLs: [
            "https://assets.entrepreneur.com/content/3x2/2000/20150622231001-for-sale-real-estate-home-house.jpeg?crop=16:9",
            "image_two",
            "image_three"
        ],
    },
]

const AllProperties = ({title, query, squeeze, isAdminAccount, isUserAccount}: {
  title?: string,
  query?: string,
  squeeze?: boolean,
  isAdminAccount?: boolean,
  isUserAccount?: boolean
}) => {
    return (
        <div className="mb-10" id="featured">
            {title && <ViewTitle title={title} className="mt-10 mb-6"/>}
            <div className="grid w-full grid-cols-2 gap-y-6 md:grid-cols-3 lg:grid-cols-4 ">
                {
                    testProperties.map((ppty) => (
                        <span key={ppty.id}>
                            <PropertyCard
                                id={ppty.id}
                                category={ppty.category}
                                imageURLs={ppty.imageURLs}
                                title={ppty.title}
                                price={ppty.price}
                                state={ppty.state}
                                username={ppty.username}
                                status={ppty.status}
                                squeeze={squeeze}
                                isAdminAccount={isAdminAccount}
                                isUserAccount={isUserAccount}
                                />
                        </span>
                    ))
                }


            </div>
        </div>
    )
}

export default AllProperties