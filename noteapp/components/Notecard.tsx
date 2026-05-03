"use client";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-black flex flex-col justify-between group hover:shadow-md hover:scale-105 transition-all">
      <div>
        <h3 className="font-semibold text-xl mb-3 text-black">{note.title}</h3>
        <p className="text-black whitespace-pre-wrap leading-relaxed">
          {note.content}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-black pt-4">
        <span className="text-sm text-black font-medium mr-4">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-5 ml-5">
          <button
            onClick={() => onEdit(note)}
            className="text-sm font-semibold text-black hover:underline transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-sm font-semibold text-black hover:underline transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}