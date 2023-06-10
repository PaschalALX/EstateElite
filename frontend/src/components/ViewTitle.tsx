import { twMerge } from "tailwind-merge"

const ViewTitle = ({
    title, className
}: {
    title: string,
    className?: string
}) => {
    return (
        <h1 className={twMerge("text-center font-bold text-2xl text-gray-700 my-10 -mb-2", className)}>
            { title }
        </h1>
    )
}

export default ViewTitle