type ContainerType = React.PropsWithChildren & {
    className?:string,
}
const Container = ({children, className}:ContainerType) => {
    return <div className={`px-5 w-full max-w-6xl m-auto  ${className}`}>
        {children}
    </div>
}

export default Container