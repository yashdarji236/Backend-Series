import { FollowContext } from "../FollowContext";
import { useContext , useEffect} from "react";
import { Followrequest , GetRequest , AcceptRequest , GetFollowers , getUsers} from '../Service/follow.api'
import { GetAllusers } from "../../auth/service/auth.sevice";


export const useFollow = () => {
  
    const context = useContext(FollowContext)
    const { loading , Setloading , request , Setrequest , accept , Setaccept,reject , Setreject ,user , Setuser} = context
    const handleRequest = async (username) => {
  try {
    Setloading(true)

    // 👇 optimistic UI update
    Setrequest(prev => ({
      ...prev,
      [username]: "pending"
    }))

    await Followrequest(username)

  } catch (err) {
    console.log(err)
  } finally {
    Setloading(false)
  }
}
  const getRequest = async () =>{
    Setloading(true);
    const data = await GetRequest();
    Setrequest(data);
    Setloading(false);

  }
 
 const acceptReq = async (requestuser) => {
  try {
    Setloading(true);
    await AcceptRequest(requestuser);

    // 🔁 re-fetch updated requests
    await getRequest();
  } finally {
    Setloading(false);
  }
};

    const getFollower = async () =>{
        try {
    Setloading(true)
    const data = await GetFollowers()
    Setaccept(data)
    return data            
  } finally {
    Setloading(false)
  }

    }
  
    return {
        loading  , request  , accept ,reject , user  , handleRequest , getRequest , acceptReq , getFollower 
    }
}