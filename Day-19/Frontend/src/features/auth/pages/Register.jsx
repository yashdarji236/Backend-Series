import React , { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import '../style/form.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const [username , Setusername] = useState("")
  const [email , Setemail] = useState("")
  const [password , Setpassword] = useState("")
  const { handleRegister  , loading} = useAuth()
  const navigate = useNavigate()
    if(loading){
    return <h1>Loading....</h1>
  }
  async function handleFormSubmit(e){
    e.preventDefault()
    const res = await handleRegister(username , email , password)
      console.log(res);
      navigate("/")
  }

  return (
    <main>
     
        <div className="box1">
          <i class="ri-instagram-line"></i>
          <h1>See everyday moments from</h1>
          <h1>your <span>close friends.</span></h1>
          <img src="https://static.cdninstagram.com/rsrc.php/v4/yt/r/pAv7hjq-51n.png" alt="" />
        </div>
        <div className="box2">
          <form onSubmit={handleFormSubmit} action="">
            <i class="ri-instagram-line"></i>
            <h2>Register into Instagram</h2>

            <input 
            onInput={(e)=>{Setusername(e.target.value)}}
              type="text"
               name='username' 
               placeholder='Enter Your Username ' 
               required/>

             <input
             onInput={(e)=>{Setemail(e.target.value)}}
             type="text"
             name='email'
              placeholder='Enter Your email '
               required/>
            <input 
            onInput={(e)=>{Setpassword(e.target.value)}}
            type="password" 
            name='password'
             placeholder='Enter Your Password' 
             required/>


            <button>Register</button>
            <a className='create'href='/login'>Already Have a Account</a>

          </form>
        </div>
      
    </main>
  )
}

export default Register
