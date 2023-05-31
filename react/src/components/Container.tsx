type ContainerType = React.PropsWithChildren & {
    className?:string,
    style?:React.CSSProperties,
}
const Container = ({children, className, style}:ContainerType) => {
    return <div className={`px-5 w-full max-w-7xl m-auto relative ${className}`} style={style}>
        {children}
    </div>
}

export default Container