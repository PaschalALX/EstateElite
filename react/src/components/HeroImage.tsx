import myImage from '../assets/real-estate-3297625.jpg'

const heroBGStyle:React.CSSProperties = {
    backgroundImage: `url(${myImage})`, 
    backgroundPosition: 'top', 
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    // backgroundSize: '1000px',
    filter: 'constrast(100%)'
}


const HeroImage = () => {
    return (
    <div style={heroBGStyle} 
        className='h-screen md:h-[calc(100vh-84px)] bg-big md:bg-cover w-full absolute top-0 md:top-[84px] z-0'>
            <div className='bg-black w-full h-full opacity-60 z-0'></div>
    </div>)
}

export default HeroImage