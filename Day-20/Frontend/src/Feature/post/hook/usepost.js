import {Getfeed} from '../sevices/post.api'
import { useContext } from 'react'
import { postContext } from '../postContext'

export const usePost = () =>{
    const context = useContext(postContext)
    const { loading , Setloading , post , Setpost , feed , Setfeed } = context
    const handleGetfeed = async()=>{
        Setloading(true)
        const data = await Getfeed()
        Setfeed(data.posts)
        Setloading(false)
    }

    return {
        loading , feed , post , handleGetfeed
    }
}