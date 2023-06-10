import React from "react"
import { AiOutlineRight } from "react-icons/ai"
import ViewTitle from "../../components/ViewTitle"

const Button = ({ children }: React.PropsWithChildren) => {
    return (<button className="relative">
        <span className="absolute right-1 top-1/2 -translate-y-1/2">
            <AiOutlineRight size={20} />
        </span>
        {children}
    </button>)
}

const FrequentSearches = () => {
    return (
        <div>
            <ViewTitle title="Frequent Searches" className="mt-10 mb-6"/>
            <div className="[&>button]:block md:[&>button]:w-full [&>button]:bg-[#B97745] [&>button]:py-3 [&>button]:rounded-lg [&>button]:text-white [&>button]:text-base [&>button]:mb-7 [&>button]:w-3/4  md:flex justify-between gap-10 [&>button]:m-auto">
                <Button>
                    Properties For Sale
                </Button>
                <Button>
                    Properties For Rent
                </Button>
                <Button>
                    List Your Own Property
                </Button>
            </div>
        </div>
    )
}

export default FrequentSearches