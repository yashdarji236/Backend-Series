import { useContext } from "react";
import {AuthContext} from '../authContext'

export function useAuth(){
    const context = useContext(AuthContext)
    return context
}