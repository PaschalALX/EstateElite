import { useState } from "react";
import { appCtx } from "./appCtx";

const AppCtxProvider = ({ children }:React.PropsWithChildren) => {
    
    const [isMenuOpen, setMenuOpen] = useState(false)

    return <appCtx.Provider value={{ 
        isMenuOpen,
        setMenuOpen,
     }}>
        { children }
     </appCtx.Provider>
}

export default AppCtxProvider