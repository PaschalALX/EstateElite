const FrequentSearches = () => {
    return (
        <div>
            <h1 className="text-center font-bold text-2xl text-gray-700 my-10">
                Frequent Searches
            </h1>
            <div className="[&>button]:block md:[&>button]:w-full [&>button]:bg-[#B97745] [&>button]:py-3 [&>button]:rounded-lg [&>button]:text-white [&>button]:text-base [&>button]:mb-7 [&>button]:w-3/4  md:flex justify-between gap-10 [&>button]:m-auto">
                <button>Properties For Sale</button>
                <button>Properties For Rent</button>
                <button>List Your Own Property</button>
            </div>
        </div>
    )
}

export default FrequentSearches