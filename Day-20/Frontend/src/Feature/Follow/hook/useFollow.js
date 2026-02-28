import { FollowContext } from "../FollowContext";
import { useContext } from "react";
import { Followrequest } from '../Service/follow.api'


export const useFollow = () => {
    const context = useContext(FollowContext)
    const { loading , Setloading , request , Setrequest , accept , Setaccept,reject , Setreject } = context
    const handleRequest = async (username) => {
  if (request?.[username]) return;

  try {
    Setloading(true);
    await Followrequest(username);

    
    Setrequest(prev => {
      const updated = {
        ...prev,
        [username]: "pending",
        
      };
      localStorage.setItem("followRequest", JSON.stringify(updated));
      
      return updated;
    });

  } finally {
    Setloading(false);
  }
};



    return {
        loading  , request  , accept ,reject  , handleRequest
    }
}