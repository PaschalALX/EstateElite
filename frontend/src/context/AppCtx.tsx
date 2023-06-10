import { createContext } from "react";
import { UserType } from "../core/@types";

type AppCtxType = {
    isMenuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType,
    setUser: React.Dispatch<React.SetStateAction<UserType>>,
    showFixedHomeBtn:boolean
}

export default createContext({} as AppCtxType)