import React, { useState } from 'react'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Register = () => {
    const { user , loading , handleRegister } = useAuth()
    const [ username , Setusername ] = useState('')
    const [email , Setemail] = useState('')
    const [ password , Setpassword ] = useState('')
    const [profileImg , SetprofileImg] = useState("")
    const [bio , Setbio] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate()

    if(loading){
      return <main> <h1>Loading....</h1></main>
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const res = await handleRegister(username , email , password , profileImg , bio)
       if (res.success) {
    navigate('/', {
      state: {
        message: `Welcome  ${username} 👋`,
        userName: username
      }
    });
  } else {
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
          <form onSubmit={handleSubmit} action="">
            <i class="ri-instagram-line"></i>
            <h2>Register into Instagram</h2>

            <input 
            onInput={(e)=>{Setusername(e.target.value) , setError("")}}
              type="text"
               name='username' 
               placeholder='Enter Your Username ' 
               required/>

             <input
             onInput={(e)=>{Setemail(e.target.value) , setError("")}}
             type="text"
             name='email'
              placeholder='Enter Your email '
               required/>
            <input 
            onInput={(e)=>{Setpassword(e.target.value) , setError("")}}
            type="password" 
            name='password'
             placeholder='Enter Your Password' 
             required/>
               <input 
            onInput={(e)=>{SetprofileImg(e.target.value) , setError("")}}
            type="text" 
            name='profileImg'
             placeholder='Enter Your image url' 
             />
                <input 
            onInput={(e)=>{Setbio(e.target.value) , setError("")}}
            type="text" 
            name='bio'
             placeholder='Enter Your Bio' 
             />
            

            <button>Register</button>
            <a className='create'href='/login'>Already Have a Account</a>

          </form>
          {error && <p className="error-text">{error}</p>}
        </div>
      
    </main>
  )
}

export default Register
