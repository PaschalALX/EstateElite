import myImage from '../assets/real-estate-3297625.jpg'

const heroBGStyle:React.CSSProperties = {
    backgroundImage: `url(${myImage})`, 
    backgroundPosition: 'top', 
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    filter: 'constrast(100%)'
}


const HeroImage = () => {
    return (
    <div style={heroBGStyle} 
        className='h-screen md:h-[80vh] w-full absolute md:static top-0'>
            <div className='bg-black w-full h-full opacity-60'></div>
    </div>)
}

export default HeroImage