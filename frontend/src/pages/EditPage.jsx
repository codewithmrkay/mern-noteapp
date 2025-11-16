import { ArrowLeft, PenSquare, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../utils/axios'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import LoadingUi from '../components/LoadingUi'
import toast from 'react-hot-toast'

const EditPage = () => {
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchNote = async () => {
            setLoading(true)
            try {
                const note = await api.get(`/notes/${id}`)
                console.log(note.data)
                setNote(note.data.data)
            } catch (error) {
                console.error("error in detailnote : ", error)
            } finally {
                setLoading(false)
            }

        }
        fetchNote()
        return () => {
        }
    }, [id])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const update = await api.put(`/notes/${id}`, {
                id,
                title: note.title.toUpperCase(),
                content: note.content

            })
            console.log(update.data)
            if (update.data.success) {
                toast.success("Note Update Successfully")
                navigate("/")
            } else {
                toast.error("Cant Update Note")
            }
        } catch (error) {
            console.error("error in update note ", error)
        } finally {
            setLoading(false)
        }
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
                                <h1 className='card-title text-2xl mb-4'>Create New Note</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-4 flex flex-col items-start justify-center gap-1'>
                                        <label className='label'>
                                            <h3 className='text-xl'>Title</h3>
                                        </label>
                                        <input type="text" placeholder="Your Note Title" className="w-full input input-neutral"
                                            value={note.title}
                                            onChange={(e) => setNote({ ...note, title: e.target.value })}
                                        />
                                    </div>
                                    <div className='mb-4 flex flex-col items-start justify-center gap-1'>
                                        <label className='label'>
                                            <h3 className='text-xl'>Content</h3>
                                        </label>
                                        <textarea type="text" placeholder=" Your Note Content" className="w-full textarea h-32 textarea-neutral"
                                            value={note.content}
                                            onChange={(e) => setNote({ ...note, content: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <div className='card-actions justify-end'>
                                        <button type='submit' className='btn btn-primary' disabled={loading}>
                                            {loading ? "Updating..." : "Update Note"}
                                        </button>
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

export default EditPage