import { createContext , useState} from "react";
import { useEffect } from "react";

export const AuthContext = createContext()

export const Authprovider = ({ children })=>{
    const [ user , Setuser ] = useState(null)
    const [loading , Setloading] = useState(false)
     useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      Setuser(JSON.parse(storedUser));
    }
    Setloading(false);
  }, []);

    return (
        <AuthContext.Provider value={{ user , Setuser , loading , Setloading  }} >
            {children}
        </AuthContext.Provider>
    )
}