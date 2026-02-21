import React , {useState} from 'react'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [ username , Setusername ] = useState('')
  const [password , Setpassword] = useState('')
  const { handleLogin , loading} = useAuth()
  const navigate = useNavigate()
  if(loading){
    return <h1>Loading....</h1>
  }
  async function handleForm(e){
      e.preventDefault()
      const res = await handleLogin(username , password)
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
          <form action="" onSubmit={handleForm}>
            <i class="ri-instagram-line"></i>
            <h2>Log into Instagram</h2>
            <input 
            onInput={(e)=>{Setusername(e.target.value)}} 
            name='username'
            type="text"
             placeholder='Enter Your Username or Email' 
             required/>

            <input 
            onInput={(e)=>{Setpassword(e.target.value)}} 
            type="password" 
            name='password'
            placeholder='Enter Your Password'
             required/>

            <button>Login</button>
            <a className='create' href='/Register'>Create New Account</a>

          </form>
        </div>
      
    </main>
  )
}

export default Login
