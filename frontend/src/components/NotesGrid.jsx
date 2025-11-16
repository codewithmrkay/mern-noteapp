import { Pen, PenSquare, Trash2 } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../utils/dateFormatter";
import { useState } from "react";
import toast from "react-hot-toast"
import LoadingUi from "./LoadingUi";
import api from "../utils/axios.js";
const NotesGrid = ({ note, setNote }) => {
  const [loading, setLoding] = useState(false)
  const navigate = useNavigate()
  const handleDelete = async (id, event) => {
    event?.stopPropagation();
    event?.preventDefault();
    try {
      setLoding(true)
      const deleteNote = await api.delete(`/notes/${id}`)
      if (deleteNote.data.success) {
        setNote((prev) => prev.filter(note => note._id != id))
        toast.success("Note Deleted Successfully")
      }
    } catch (error) {
      console.error("Error white Deleting Note ", error)
      toast.error("Cant Delete Note")
    } finally {
      setLoding(false)
    }

  }
  const handleEdit = (e) => {
    e.preventDefault();
    console.log("edit idonc clickd")
    navigate(`/note/edit/${note._id}`)
  }
  return (
    <>
      {loading && <LoadingUi />}
      <Link to={`/note/${note._id}`}
        className="card bg-base-300  hover:shadow-lg transition-all duration-200
         border-t-4 border-primary"
      >
        <div className="card-body">
          <h1 className="card-title text-base-content">{note.title}</h1>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
            <div className="flex items-center justify-end gap-1">
              <button onClick={handleEdit} className="hover:bg-base-content/20 btn btn-ghost">
                <PenSquare className="size-4 " />
              </button>
              <button onClick={(e) => handleDelete(note._id, e)} className="hover:bg-base-content/20 btn btn-ghost text-error">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NotesGrid;
