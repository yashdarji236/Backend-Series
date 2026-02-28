import {Getfeed , createPost , postLiked , postUnliked} from '../sevices/post.api'
import { useContext } from 'react'
import { postContext } from '../postContext'
import { useEffect } from 'react'
export const usePost = () =>{
    const context = useContext(postContext)
    const { loading , Setloading , post , Setpost , feed , Setfeed } = context
    const handleGetfeed = async()=>{
        Setloading(true)
        const data = await Getfeed()
        Setfeed(data.posts)
        Setloading(false)
    }
    const createpost = async(image , caption)=>{
        Setloading(true)
        const data = await createPost(image , caption)
        console.log(data);
        Setfeed([data.post, ...feed])
        Setloading(false)
    }

    const handleLiked = async (post)=>{
        Setloading(true)
        const data = await postLiked(post)
        await handleGetfeed()
        Setloading(false)
    }
    const handleunLiked = async (post)=>{
        Setloading(true)
        const data = await postUnliked(post)
        await handleGetfeed()
        Setloading(false)
    }
      useEffect(()=>{
        handleGetfeed()
      },[])
    return {
        loading , feed , post , handleGetfeed, createpost , handleLiked , handleunLiked
    }
}