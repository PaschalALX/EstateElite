import Container from "../../components/Container"
import { BsFacebook, BsGithub, BsInstagram, BsYoutube, BsTwitter } from "react-icons/bs"

const ContactView = () => {
    return (
        <footer className="bg-[#1f1c18] mt-10 text-[#f2ede6] py-5 px-6" id="contacts">
            <Container className="">
                <h2 className="text-lg font-semibold mb-2 pt-2"> Subscribe to our newsletter </h2>
                <p className="mb-10"> The latest news, articles, and resources, sent to your inbox weekly. </p>
                <div className="mb-20 mt-5">
                    <input type="text" placeholder="Enter your email" className="placeholder:text-[#412b1a] py-1 px-3 w-72 mr-2 rounded-lg bg-[#c8c1b4] text-[#6b472b]" />
                    <button className="bg-[#996238] p-3 py-1 rounded-lg"> Subscribe </button>
                </div>

                <div className="flex border-t-2 border-gray-400 justify-between pt-5">
                    <div className="text-sm">
                        &copy; 2023 EstateElite. All rights reserved.
                    </div>
                    <div className="flex gap-5">
                        <a href="https://github.com/PaschalALX/EstateElite">
                            <BsGithub />
                        </a>
                        <a href="https://github.com/PaschalALX/EstateElite">
                            <BsFacebook />
                        </a>
                        <a href="https://github.com/PaschalALX/EstateElite">
                            <BsTwitter />
                        </a>
                        <a href="https://github.com/PaschalALX/EstateElite">
                            <BsInstagram />
                        </a>
                        <a href="https://github.com/PaschalALX/EstateElite">
                            <BsYoutube />
                        </a>
                    </div>
                </div>
            </Container>

        </footer>
    )
}

export default ContactView