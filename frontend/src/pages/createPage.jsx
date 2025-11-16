import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../utils/axios.js'
const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()
    if(!title.trim() || !content.trim()){
      toast.error("All Fields Are Required")
      setLoading(false)
      return
    }
    try {
      const newNote = await api.post("/notes",{
        title,
        content
      }) 
      if(newNote.data.success){
        toast.success("Note Created Successfully")
      }
      setContent("")
      setTitle("")
      navigate("/")
    } catch (error) {
      console.error("error in create note : ",error)
      toast.error("cant create Note")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen w-screen p-4'>
      <div className='container mx-auto'>
        <div className='btn btn-ghost mb-4'>
          <Link to={'/'} className='flex items-center justify-center gap-2'>
            <ArrowLeft className='size-5' />
            <span>Back To Home</span>
          </Link>
        </div>
        <div className='card bg-base-300 max-w-2xl mx-auto p-0 md:p-6'>
          <div className='card-body'>
            <h1 className='card-title text-2xl mb-4'>Create New Note</h1>
            <form onSubmit={handleSubmit}>
              <div className='mb-4 flex flex-col items-start justify-center gap-1'>
                <label className='label'>
                  <h3 className='text-xl'>Title</h3>
                </label>
                <input type="text" placeholder="Your Note Title" className="w-full input input-neutral"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='mb-4 flex flex-col items-start justify-center gap-1'>
                <label className='label'>
                  <h3 className='text-xl'>Content</h3>
                </label>
                <textarea type="text" placeholder=" Your Note Content" className="w-full textarea h-32 textarea-neutral"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className='card-actions justify-end'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading?"Creating...":"Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage