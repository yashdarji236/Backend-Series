import  { useState } from 'react'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Login = () => {
    const { user , loading , handleLogin } = useAuth()
    const navigate = useNavigate()
    const [username , Setusername] = useState('')
    const [password , Setpassword] = useState('')
    const [error, setError] = useState("");
    if(loading){
    return <main> <h1>Loading....</h1></main>
  }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const res = await handleLogin(username , password)
        if (res.success) {
    navigate('/', {
      state: {
        message: `Welcome back ${username} 👋`,
        userName: username
      }
    });
  } else {
    // ❌ stay on login page
    setError(res.message);
  }


        
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
          <form action="" onSubmit={handleSubmit}>
            <i class="ri-instagram-line"></i>
            <h2>Log into Instagram</h2>
            <input 
            onInput={(e)=>{Setusername(e.target.value),  setError("")}} 
            name='username'
            type="text"
             placeholder='Enter Your Username or Email'  
             required/>

            <input 
            onInput={(e)=>{Setpassword(e.target.value) ,  setError("")}} 
            type="password" 
            name='password'
            placeholder='Enter Your Password'
             required/>

            <button>Login</button>
            <a className='create' href='/Register'>Create New Account</a>

          </form>
          {error && <p className="error-text">{error}</p>}
        </div>
      
    </main>
  )
}

export default Login
