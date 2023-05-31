import { createContext } from "react";

export type UserType = null | {
    username: string,
    token: string
}

type AppCtxType = {
    isMenuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType,
    setUser: React.Dispatch<React.SetStateAction<UserType>>
}
export const appCtx = createContext({} as AppCtxType)