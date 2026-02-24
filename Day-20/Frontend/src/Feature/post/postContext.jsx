import {  createContext , useState } from "react";

export const postContext = createContext()

export const PostProvider = ({children})=>{
    const [loading , Setloading] = useState(false)
    const [post , Setpost] = useState(null)
    const [feed , Setfeed] = useState([])


    return (
        <postContext.Provider value={{loading , Setloading , post , Setpost , feed , Setfeed}}>
            {children}
        </postContext.Provider>
    )
}