import ViewTitle from "../../components/ViewTitle"
import Container from "../../components/Container"
import AboutPic from "../../assets/jtccustomer.jpeg"

const aboutPicStyle: React.CSSProperties = {
    backgroundImage: `url("${AboutPic}")`,
    backgroundSize: "cover",
    backgroundPosition: "center"
}
const AboutView = () => {
    return <div className="about">
        <ViewTitle title="About EstateElite" className="mt-16 mb-4" />
        <Container className="px-10">

            <div style={aboutPicStyle} className=" float-right hidden md:block w-80 h-80 ml-5" />
            <div>
                <p >
                    EstateElite is designed to revolutionize your property search experience in Nigeria. Our app provides a seamless platform for users to explore a vast array of property listings, complete with detailed information and captivating images. Additionally, we go above and beyond by empowering users to securely advertise their own properties within the application.
                </p>
                <br />
                <p>
                    With our app, guests are invited to embark on a virtual journey across Nigeria's diverse real estate landscape. Whether you're in search of a cozy apartment, a spacious villa, or a commercial space, our comprehensive listings cater to various property types and locations across the country. Each property listing within the app is thoroughly scrutinized to provide you with the essential and legitimate details you need to make informed decisions.
                </p>
                    <br />
                <p>
                    But we don't stop at simply presenting listings. Our app takes user interaction to the next level by offering a secure platform for property owners, agents, and individuals to advertise their properties. Whether you're a homeowner looking to sell or rent out your property or an agent seeking to expand your reach, our app offers a hassle-free way to showcase your listings to a wide audience.
                </p>

            </div>

        </Container>
    </div>
}

export default AboutView