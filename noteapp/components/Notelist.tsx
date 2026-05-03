"use client";

import NoteCard from "./Notecard";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, isLoading, onEdit, onDelete }: NoteListProps) {
  return (
    <section className="w-full pb-12">
      <h1 className="flex justify-center items-center text-3xl font-semibold mb-6">My Notes</h1>

      {isLoading ? (
        <p className="text-black animate-pulse">Loading your notes...</p>
      ) : notes.length === 0 ? (
        <div className="p-12 text-center border-2 border-black rounded-xl">
          <p className="text-black">Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  );
}