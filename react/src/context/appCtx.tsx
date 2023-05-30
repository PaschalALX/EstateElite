import { createContext } from "react";
type AppCtxType = {
    isMenuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const appCtx = createContext({} as AppCtxType)