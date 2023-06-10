import BlogCard from "../../components/BlogCard"
import CarouselButton from "../../components/CarouselButton"
import { BlogType } from "../../core/@types"
import { useState } from "react"
import { carouselCycle } from "../../core/util"
import BlogBGSrc from '../../assets/retrosupply-jLwVAUtLOAQ-unsplash.jpg'


const blogViewBGStyle: React.CSSProperties = {
    backgroundImage: `url('${BlogBGSrc}')`,
    backgroundSize: 'cover'
}

const BlogsView = ({
    blogList
}: {
    blogList: BlogType[]
}) => {

    const [blogIndex, setBlogIndex] = useState(0)

    const cycleBlogLeft = () => {
        carouselCycle('left', blogList.length, setBlogIndex)
    }

    const cycleBlogRight = () => {
        carouselCycle('right', blogList.length, setBlogIndex)
    }

    return (
        <div className="relative">
            <h1 className="text-center font-bold text-2xl text-gray-700 my-10 -mb-2">
                Blogs
            </h1>
            <div className="mb-10 md:w-[90%] w-[90%] m-auto flex my-10 rounded-xl overflow-hidden shadow-lg shadow-black relative bg-white text-justify">
                <CarouselButton direction="left" className="hover:text-gray-800" handleClick={cycleBlogLeft} />
                <CarouselButton direction="right" className="hover:text-white" handleClick={cycleBlogRight} />

                <div className="flex-grow  overflow-auto text-gray-500 px-1 md:px-3 " >
                    <BlogCard {...blogList.at(blogIndex) as BlogType} />
                </div>
                <div className="w-48 flex justify-center items-center " style={blogViewBGStyle} />
            </div>
        </div>
    )
}

export default BlogsView