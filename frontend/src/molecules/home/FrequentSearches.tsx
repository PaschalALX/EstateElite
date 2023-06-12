import React, { useContext } from "react"
import { AiOutlineRight } from "react-icons/ai"
import ViewTitle from "../../components/ViewTitle"
import { refresh } from "../../core/auth-request"
import AppCtx from "../../context/AppCtx"
import { useNavigate } from "react-router-dom"
import { Auth } from "../../core/util"

const Button = ({ children, handleClick }: React.PropsWithChildren & {
    handleClick: (e:React.MouseEvent)=>void
}) => {
    return (<button className="relative" onClick={(e)=>handleClick(e)}>
        <span className="absolute right-1 top-1/2 -translate-y-1/2">
            <AiOutlineRight size={20} />
        </span>
        {children}
    </button>)
}

const FrequentSearches = () => {
    const {setUser, setMenuOpen} = useContext(AppCtx)
    const navigate = useNavigate()

    const gotoNewPptyView = () => {
        refresh((data) => {
            setUser(data)
            Auth.set(data)
            navigate('/myaccount/new_property')
            setMenuOpen(false)
        },
            () => {
                if (Auth.isSet())
                    alert('Session Expired')
                navigate('/login')
                setUser(null)
                Auth.remove()
                setMenuOpen(false)
            }
        )
    }
    return (
        <div>
            <ViewTitle title="Frequent Searches" className="mt-10 mb-6"/>
            <div className="[&>button]:block md:[&>button]:w-full [&>button]:bg-[#B97745] [&>button]:py-3 [&>button]:rounded-lg [&>button]:text-white [&>button]:text-base [&>button]:mb-7 [&>button]:w-3/4  md:flex justify-between gap-10 [&>button]:m-auto">
                <Button
                    handleClick={()=>{}}
                >
                    Properties For Sale
                </Button>
                <Button
                    handleClick={()=>{}}
                >
                    Properties For Rent
                </Button>
                <Button
                    handleClick={gotoNewPptyView}
                >
                    List Your Own Property
                </Button>
            </div>
        </div>
    )
}

export default FrequentSearches