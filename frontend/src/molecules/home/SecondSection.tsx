import Container from "../../components/Container"
import FeaturedProperties from "./FeaturedProperties"
import FrequentSearches from "./FrequentSearches"
import BlogsView from "./BlogsView"
import { BlogType } from "../../core/@types"

const blogList: BlogType[] = [
  {
    id: "1",
    title: "1 Lorem ipsum dolor sit amet consectetur",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam error vel fugit veritatis accusantium non. Nesciunt alias accusantium doloremque facere aut nemo? Accusamus dolorum adipisci saepe quibusdam tenetur voluptates atque hic fugit beatae? Nam minima perferendis, debitis necessitatibus officia a.",
    username: "pasmac",
    userId: "pasmac1234",
    readtime: "3 mins"
  },
  {
    id: "2",
    title: "2 Lorem ipsum dolor sit amet consectetur",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam error vel fugit veritatis accusantium non. Nesciunt alias accusantium doloremque facere aut nemo? Accusamus dolorum adipisci saepe quibusdam tenetur voluptates atque hic fugit beatae? Nam minima perferendis, debitis necessitatibus officia a.",
    username: "pasmac",
    userId: "pasmac1234",
    readtime: "3 mins"
  },
  {
    id: "3",
    title: "3 Lorem ipsum dolor sit amet consectetur",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam error vel fugit veritatis accusantium non. Nesciunt alias accusantium doloremque facere aut nemo? Accusamus dolorum adipisci saepe quibusdam tenetur voluptates atque hic fugit beatae? Nam minima perferendis, debitis necessitatibus officia a.",
    username: "eze",
    userId: "eze1234",
    readtime: "3 mins"
  }

]


const SecondSection = () => {

  return (
    <div className="mt-[100vh] absolute top-0 z-30 w-full">
      <Container>
        <FrequentSearches />
        <FeaturedProperties />
        <BlogsView blogList={blogList} />
      </Container>
    </div>
  )
}

export default SecondSection