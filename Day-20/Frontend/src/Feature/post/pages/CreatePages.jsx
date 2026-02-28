import React from 'react'
import { useState , useRef , useEffect} from 'react'
import '../style/create.scss'
import { useNavigate } from 'react-router-dom'
import {usePost} from '../hook/usepost'
const CreatePages = () => {
  const usenavigate = useNavigate()
  const {loading , createpost} = usePost()
  const [caption , Setcaption] = useState("")
  const ImgRef = useRef(null)
  async function HandleSubmit(e){
    e.preventDefault()
    const file = ImgRef.current.files[0]
    await createpost(file,caption)
    usenavigate('/')
  }
  if(loading){
    return <main><h1>Creating...</h1></main>
  }

  return (
    <main className='create-post'>
      <div className="form-con">
        <h1>Create Post</h1>
        <form className='form' onSubmit={HandleSubmit}>
            <label className='label-img' htmlFor="post-img">Select Image</label>
            <input ref={ImgRef} hidden type="file" name='image' id='post-img' />
            <input onChange={(e)=>{Setcaption(e.target.value)}} type="text" name='caption' id='caption' placeholder='Add Caption' />
            <button className='button primary-button'>Create Post</button>
        </form>
        <button onClick={()=>{usenavigate('/')}} className='back'>Back</button>
      </div>
    </main>
  )
}

export default CreatePages
