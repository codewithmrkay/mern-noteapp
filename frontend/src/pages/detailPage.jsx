import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router'
import { ArrowLeft, PenSquare } from 'lucide-react'
import LoadingUi from '../components/LoadingUi'
import api from '../utils/axios.js'
const DetailPage = () => {
  const [note, setNote] = useState(null)
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true)
      try {
        const notedata = await api.get(`/notes/${id}`)
        console.log(notedata)
        if (notedata.data.success && !note) {
          setNote(notedata.data.data)
          toast.success("View Note Successfully")
          setLoading(false)
        } else {
          toast.error("Note Not Found")
        }
      } catch (error) {
        console.error("error in detailnote : ", error)
        toast.error("Failed to get Detail Note")
      } finally {
        setLoading(false)
      }

    }
    fetchNote()
    return () => {
    }
  }, [id])
  const handleSubmit = async () => {
    toast.success("developer plz create edit page 😜")
  }
  return (
    <>
      {loading && <LoadingUi />}
      {note &&
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
                <h1 className='card-title text-2xl mb-4'>Your Note</h1>
                <form onSubmit={handleSubmit}>
                  <div className='mb-4 flex flex-col items-start justify-center gap-1'>
                    <h3 className='text-2xl'>{note.title}</h3>
                  </div>
                  <div className='mb-4 text-base-content/60 flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl'>{note.content}</p>
                  </div>
                  <div className='card-actions justify-end' >
                    <Link to={`/note/edit/${note._id}`} >
                      <button type='submit' className='btn btn-primary' disabled={loading}>
                        <PenSquare className="size-4" />
                        <span>Edit Note</span>
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default DetailPage