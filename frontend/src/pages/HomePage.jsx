import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitUi from '../components/RateLimitUi'
import { toast } from "react-hot-toast"
import LoadingUi from '../components/LoadingUi'
import NotesGrid from '../components/NotesGrid'
import DontHaveNote from '../components/DontHaveNote'
import api from '../utils/axios.js'
const HomePage = () => {
  const [IsRateLimit, setIsRateLimit] = useState(false)
  const [notes, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const res = await api.get("/notes")
        console.log(res.data.data)
        setNote(res.data.data)
      } catch (error) {
        console.log("error get node : ", error)
        if (error.response?.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("cant get Notes")
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNotes()
  }, [])
  return (
    <div className='min-h-screen'>
      <Navbar />
      {IsRateLimit && <RateLimitUi />}
      {loading && <LoadingUi />}
      {notes.length==0 && <DontHaveNote/>}
      {notes.length>0 && (
        <div className='mt-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl gap-4'>
         {notes.map((note)=>(
          <NotesGrid key={note._id} note={note} setNote={setNote}/>
         ))}
        </div>
      )}
    </div>
  )
}

export default HomePage