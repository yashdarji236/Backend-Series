import React from 'react'
import {  createContext , useState } from "react";

export const FollowContext = createContext()
export const FollowProvider = ({children})=>{
    
    const [ loading , Setloading ] = useState(false)
    const [ request , Setrequest] = useState(() => {
  return JSON.parse(localStorage.getItem("followRequest")) || {};
});
    const [ accept, Setaccept] = useState([])
    const [ reject , Setreject] = useState([])
    return (
        <FollowContext.Provider value={{loading , Setloading , 
            request , Setrequest , 
            accept , Setaccept,
            reject , Setreject
        }}>
            {children}
        </FollowContext.Provider>
    )
}
