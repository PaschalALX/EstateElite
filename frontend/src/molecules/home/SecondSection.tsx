import Container from "../../components/Container"
import FeaturedProperties from "../../components/home/FeaturedProperties"
import FrequentSearches from "../../components/home/FrequentSearches"

const SecondSection = () => {

  return (
    <div className="mt-[100vh] absolute top-0 z-30 w-full">
      <Container>
        <FrequentSearches/>
        <FeaturedProperties/>
      </Container>
    </div>
  )
}

export default SecondSection