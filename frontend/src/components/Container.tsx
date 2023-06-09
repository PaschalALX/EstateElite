import { twMerge } from "tailwind-merge"

type ContainerType = React.PropsWithChildren & {
    className?: string,
    style?: React.CSSProperties,
}
const Container = ({ children, className, style }: ContainerType) => {
    return <div className={twMerge(`px-5 w-full max-w-6xl m-auto relative`, className)} style={style}>
        {children}
    </div>
}

export default Container