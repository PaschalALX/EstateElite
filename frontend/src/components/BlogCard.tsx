import { Link } from "react-router-dom"
import { HiUserCircle } from "react-icons/hi"
import { BlogType } from "../core/@types"
import { shortenWords, firstLetterCapital } from "../core/util"


const BlogCard = ({
    id, title, body, username, userId, readtime
  }: BlogType) => {
    return (
      <div className="p-2 px-10 pb-12">
        <h1 className="font-bold text-xl mt-10 mb-5">
          {title}
        </h1>
        <p className="mb-3">
          {shortenWords(body, 296)}
        </p>
        <Link
          to={id}
          className="text-[#B97745]"
        >
          Read more &rarr;
        </Link>
        <div className="flex justify-between items-center mt-5 -mb-3 pt-1">
          <a href={userId} className="flex items-center font-semibold gap-x-1">
            <HiUserCircle size={20} /> { firstLetterCapital(username) }
          </a>
          <span> {readtime} read </span>
        </div>
      </div>
    )
  }

export default BlogCard