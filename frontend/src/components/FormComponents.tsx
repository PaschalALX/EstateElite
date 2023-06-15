import { PropsWithChildren, ReactNode } from "react"
import { BsFacebook, BsGithub, BsInstagram, BsYoutube, BsTwitter } from "react-icons/bs"
import { twMerge } from "tailwind-merge"

export const Input = ({ id, type, placeholder, className, maxLength, handleChange }: {
    id: string,
    type?: string,
    placeholder: string,
    className?: string,
    maxLength?: number,
    handleChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
}) => {
    return (<input maxLength={maxLength} onChange={(e)=>handleChange!(e)} type={type ?? 'text'} placeholder={placeholder} id={id} className={twMerge("p-2 rounded-lg placeholder:text-[#a39890]  text-[#6b472b] bg-[#f7f3ed] text-sm", className)} />)
}


export const InputGroup = ({ id, type, placeholder, label, width, className, maxLength, handleChange }: {
    id: string,
    type?: string,
    placeholder: string,
    label: string,
    width?: string,
    className?: string,
    maxLength?: number,
    handleChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
}) => {
    return (
        <div className={twMerge("flex flex-col", width)}>
            <label htmlFor={id} className="mb-2 font-semibold"> {label} </label>
            <Input id={id} type={type} placeholder={placeholder} className={className} handleChange={handleChange} maxLength={maxLength}/>
        </div>)
}

export const InputGroupControl = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex gap-x-5 mb-8">
            {children}
        </div>
    )
}

export const TextFieldControl = ({
    label, id, cols, rows, className, maxLength, placeholder, handleChange
}: {
    label: string,
    id: string,
    cols?: number,
    rows?: number,
    className?: string,
    maxLength?: number,
    placeholder: string,
    handleChange:(e:React.FormEvent<HTMLTextAreaElement>)=>void
}) => {
    return (
        <div className={twMerge("w-full", className)} >
            <label htmlFor={id} className="mb-2  font-semibold"> {label} </label>
            <textarea
                maxLength={maxLength}
                onChange={(e)=>handleChange(e)}
                className="w-full rounded-lg bg-[#f7f3ed] mt-2 p-2 text-sm text-black resize-none"
                name="message" id={id} cols={cols} rows={rows}
                placeholder={placeholder}>
            </textarea>
        </div >
    )
}

export const SelectControl = ({ name, id, label, children, className }: PropsWithChildren & {
    name: string,
    id: string,
    label: string,
    className?: string,
    children: ReactNode
}) => {
    return (
        <>
            <label htmlFor={id} className="font-semibold mb-2"> {label} </label>
            <select name={name} id={id} className={twMerge("w-full p-2 rounded-lg placeholder:text-[#a39890] text-sm text-[#6b472b] bg-[#f7f3ed]", className)}>
                {children}
            </select>
        </>
    )
}

export const Button = ({children, className}:PropsWithChildren & {
    children: string,
    className?: string
}) => {
    return (<button className={twMerge("bg-[#996238] p-6 py-2 rounded-lg font-semibold", className)}> {children} </button>)
}
export const LastFooter = () => {
    return (<div className="flex border-t-2 border-gray-400 justify-between pt-5 mt-5">
        <div className="text-sm">
            &copy; 2023 EstateElite. All rights reserved.
        </div>
        <div className="flex gap-5">
            <a href="https://github.com/PaschalALX/EstateElite">
                <BsGithub />
            </a>
            <a href="https://github.com/PaschalALX/EstateElite">
                <BsFacebook />
            </a>
            <a href="https://github.com/PaschalALX/EstateElite">
                <BsTwitter />
            </a>
            <a href="https://github.com/PaschalALX/EstateElite">
                <BsInstagram />
            </a>
            <a href="https://github.com/PaschalALX/EstateElite">
                <BsYoutube />
            </a>
        </div>
    </div>)
}