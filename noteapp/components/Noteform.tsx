"use client";

interface NoteFormProps {
  title: string;
  content: string;
  editingId: string | null;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

export default function NoteForm({
  title,
  content,
  editingId,
  onTitleChange,
  onContentChange,
  onSubmit,
  onCancelEdit,
}: NoteFormProps) {
  return (
    <section className="w-full">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-black">
        <h2 className="text-3xl font-semibold mb-5">
          {editingId ? "Edit Note" : "Create New Note"}
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="p-3 font-light text-lg rounded-xl bg-white border border-black outline-none transition-all text-black placeholder-black"
            required
          />
          <textarea
            placeholder="Description"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="p-4 font-light rounded-xl bg-white border border-black min-h-[120px] resize-none text-black placeholder-black"
          />
          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 bg-black font-light text-white font-bold py-5 px-6 rounded-full hover:bg-white hover:text-black border border-black"
            >
              {editingId ? "Update Note" : "Save Note"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="bg-white text-black font-semibold py-3 px-8 rounded-xl hover:bg-black hover:text-white border border-black transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}