import { createContext } from "react";
type AppCtxType = {
    isMenuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    isAccountModalOpen: boolean,
    setAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    accountPaneSelect: 'login' | 'register',
    setAccountPaneSelect: React.Dispatch<React.SetStateAction<'login'|'register'>>
}
export const appCtx = createContext({} as AppCtxType)