import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { twMerge } from "tailwind-merge"

const CarouselButton = ({direction, className, handleClick}:
    {
        direction: 'left' | 'right', 
        className: string, 
        handleClick: () => void}
    ) => {

    if (direction === 'left') return (
        <button onClick={handleClick} className={twMerge("absolute top-1/2 -translate-y-1/2 text-gray-300 hover:scale-125", className)}>
            <AiOutlineLeft size={40} />
        </button>
    )

    return (
        <button onClick={handleClick} className={twMerge("absolute top-1/2 right-0 -translate-y-1/2 text-gray-300 hover:scale-125", className)}>
            <AiOutlineRight size={40} />
        </button>
    )
}

export default CarouselButton