import { createContext , useState} from "react";


export const AuthContext = createContext()

export const Authprovider = ({ children })=>{
    const [ user , Setuser ] = useState(null)
    const [loading , Setloading] = useState(false)
    
    return (
        <AuthContext.Provider value={{ user , Setuser , loading , Setloading  }} >
            {children}
        </AuthContext.Provider>
    )
}