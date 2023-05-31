import { useState } from "react";
import { appCtx, UserType } from "./appCtx";

const AppCtxProvider = ({ children }:React.PropsWithChildren) => {
    
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [user, setUser] = useState<UserType|null>({token:'kj', username:'pasmac'})
   
    return <appCtx.Provider value={{ 
        isMenuOpen,
        setMenuOpen,
        user,
        setUser
     }}>
        { children }
     </appCtx.Provider>
}

export default AppCtxProvider