import React from "react";
import { Frown, Notebook } from "lucide-react"; // Lucide icon
import { Link } from "react-router";

const DontHaveNote = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
            <Frown className="size-20 text-primary" />
            <h2 className="text-xl font-semibold text-base-content">
                No Notes Yet
            </h2>
            <p className="text-base-content/70 mt-2 max-w-sm">
                Start creating your first note and keep your thoughts organized.
            </p>
            <Link to={"/create"}>
                <button className="btn btn-primary mt-6">
                    Add Note
                </button>
            </Link>
        </div>
    );
};

export default DontHaveNote;
