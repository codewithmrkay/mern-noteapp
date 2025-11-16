import mongoose from "mongoose";
import Note from "../models/note.js"
export async function getAllNotes(req, res) {
    try {
        const note = await Note.find().sort({createdAt:-1})
        res.status(200).json({ success: true, data: note })
    } catch (error) {
        console.error("error in Getting Note : ", error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getNoteById(req, res) {
    try {
        const { id } = req.params;
        // Validate ObjectId format first
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Note not found" });
        }
        const note = await Note.findById(id)
        res.status(200).json({ success: true, data: note })
    } catch (error) {
        console.error("error in getone Note : ", error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const newtitle = title.toUpperCase();
        const noteExits = await Note.findOne({ title: newtitle })
        console.log(noteExits)
        if (noteExits) {
            return res.status(400).json({ success: false, message: "note title must Unique" })
        }
        const newNote = new Note({ title: newtitle, content: content })
        const saveNote = await newNote.save()
        res.status(200).json({ success: true, message: "new note created successfully", data: saveNote })
    } catch (error) {
        console.error("error in creating Note : ", error)
        res.status(500).json({ success: false, message: "internal server error" })

    }
}
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const { id } = req.params;

        // Validate ObjectId format first
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Note not found" });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({success:true, message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.error("Error in updating Note:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Note not found" });
        }
        const deleteNote = await Note.findByIdAndDelete(
            id
        )
        if (!deleteNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({success:true, message: "notes delete successfully" })

    } catch (error) {
        console.error("Error in deleting Note:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}