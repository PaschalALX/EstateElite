import { useState } from "react";
import { appCtx } from "./appCtx";

const AppCtxProvider = ({ children }:React.PropsWithChildren) => {
    
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isAccountModalOpen, setAccountModalOpen] = useState(false)
    const [accountPaneSelect, setAccountPaneSelect] = useState('login' as 'login'|'register')

    return <appCtx.Provider value={{ 
        isMenuOpen,
        setMenuOpen,
        isAccountModalOpen, 
        setAccountModalOpen,
        accountPaneSelect,
        setAccountPaneSelect
     }}>
        { children }
     </appCtx.Provider>
}

export default AppCtxProvider