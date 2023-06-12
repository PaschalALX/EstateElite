import PropertyCard from "../../components/PropertyCard"
import ViewTitle from "../../components/ViewTitle"

const testProperties = [
    {
        id: '1',
        title: 'Title One',
        username: 'Pasmac',
        userId: 'pasmac123456',
        description: 'Description One',
        state: 'Kaduna',
        price: '17000000',
        category: "Commercial Property for Sale",
        imageURLs: [
            "https://wp-tid.zillowstatic.com/bedrock/app/uploads/sites/43/GettyImages-172318681-047ca2-1400x933.jpg",
            "image_two",
            "image_three"
        ],
        createdAt: '2023-06-06T17:19:47Z'
    },
    {
        id: '2',
        title: 'Title Two',
        username: 'Pasmac',
        userId: 'pasmac123456',
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
    },
    {
        id: '3',
        title: 'Title Three',
        username: 'Eze',
        userId: 'chiemelie101234',
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
    },

]

const FeaturedProperties = () => {
    return (
        <div className="mb-10" id="featured">
            <ViewTitle title="Featured Properties" className="mt-10 mb-6"/>
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
                                userId={ppty.userId}
                                createdAt={ppty.createdAt}
                                />
                        </span>
                    ))
                }


            </div>
        </div>
    )
}

export default FeaturedProperties