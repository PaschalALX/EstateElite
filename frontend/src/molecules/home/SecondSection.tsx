import Container from "../../components/Container"
import FeaturedProperties from "./FeaturedProperties"
import FrequentSearches from "./FrequentSearches"
import BlogsView from "./BlogsView"
import AboutView from "./AboutView"
import ContactView from "./ContactView"
import ScrollLink from "../../components/ScrollLink"
import { AiFillHome } from "react-icons/ai"
import { blogList } from "../../core/data"
import { useContext } from "react"
import { twMerge } from "tailwind-merge"
import AppCtx from "../../context/AppCtx"

const SecondSection = () => {

  const {showFixedHomeBtn} = useContext(AppCtx)

  return (
    <div className="mt-[100vh] absolute top-0 z-30 w-full">
      <Container>
        <FrequentSearches />
        <FeaturedProperties />
        <BlogsView blogList={blogList} />
        <AboutView />
      </Container>
      <ContactView />
      <ScrollLink to="home" className={twMerge("fixed z-200 bottom-8 right-8 opacity-70 bg-[#996238] rounded-full p-2", `${!showFixedHomeBtn && "hidden"}`)}>
        <AiFillHome size={30} color={'#ddd'} />
      </ScrollLink>
    </div>
  )
}

export default SecondSection