import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([
    
  ])
  const [update , Setupdate] = useState(false)
  const [Editid , SetEditid] = useState(null)
  const [title , Settitle] = useState('')
  const [description , Setdescription] = useState('')
  function fetch(){
       axios.get('http://localhost:3000/api/notes')    .then((res)=>{
      setNotes(res.data.notes || [])
    })
    .catch((err)=>{
      console.log("API Error:", err)
      setNotes([])
    })
  }
useEffect(()=>{
fetch()
},[])

function formHandle(e){
  e.preventDefault()

  if(update){
    // UPDATE MODE
    axios.patch(`http://localhost:3000/api/notes/${Editid}`, {
      title: title,
      description: description
    }).then((res)=>{
      console.log(res.data)
      fetch()
      Settitle('')
      Setdescription('')
      Setupdate(false)
      SetEditid(null)
    })
  }
  else{
    // CREATE MODE
    axios.post('http://localhost:3000/api/notes',{
      title: title,
      description: description
    }).then((res)=>{
      console.log(res.data)
      fetch()
      Settitle('')
      Setdescription('')
    })
  }
}

function deleteHandle(id){
  axios.delete('http://localhost:3000/api/notes/' + id).then((res)=>{
    console.log(res.data);
    fetch()
  })
}
function updateHandle(id){
  const noteId = notes.find(note => note._id === id)

  Settitle(noteId.title)
  Setdescription(noteId.description)

  SetEditid(id)
  Setupdate(true)
  

}


  return (

    <div  className=' h-[100vh] w-[100vw] bg-zinc-800 flex gap-2.5 justify-around p-2.5 items-center max-sm:flex-col overflow-hidden'>
      <div className=' h-[100%] w-[40%] bg-zinc-500 rounded-2xl flex flex-col p-3.5 items-center justify-around gap-2 max-sm:w-[90%]'>
        <h1 className=' text-2xl text-zinc-300'>NOTES CREATER</h1>
        <form onSubmit={formHandle} className=' w-[100%] h-[80%] flex flex-col justify-around items-center' action="">
          <input value={title} onChange={
            (e)=>{
              
              Settitle(e.target.value)
            }
          }  name='title' className=' outline-none p-2 w-[80%] border-b-1 border-zinc-300 text-white' type="text" placeholder='Enter the Note title name' />
          <input onChange={(e)=>{
            Setdescription(e.target.value)
          }}  value={description} name='description' className=' outline-none p-2 w-[80%] border-b-1 border-zinc-300 text-white' type="text" placeholder='Enter the Note title name' />
          <button className= 'text-xl text-white p-2.5 bg-green-500 rounded-2xl active:scale-95 cursor-pointer'>{update ? 'Update' : 'Create'}</button>
        </form>
      </div>
      <div className='h-full w-[50%] bg-zinc-500 rounded-2xl flex flex-wrap p-3.5 gap-2  max-sm:w-[90%] overflow-y-auto justify-center'>
        {notes && notes.map((item , idx)=>{
          return <div  className='  w-[45%] bg-amber-50 rounded-2xl flex flex-col justify-around items-center p-2.5 max-sm:w-[90%]'>
          <h1 className=' text-2xl text-black'>{item.title}</h1>
          <p className=' text-center'>{item.description}</p>
         <div className=' flex gap-2 justify-center items-center'>
           <button onClick={()=>{

            updateHandle(item._id)
           }} className=' text-x text-white p-2.5 bg-green-500 rounded-2xl active:scale-95 cursor-pointer'>Edit</button>
          <button onClick={()=>deleteHandle(item._id)} className=' text-x text-white p-2.5 bg-red-500 rounded-2xl active:scale-95 cursor-pointer'>Delete</button>
         </div>


        </div>
        })}
      </div>
    </div>
  )
}

export default App
