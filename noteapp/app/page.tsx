"use client";

import { useState, useEffect } from "react";
import NoteForm from "@/components/Noteform";
import NoteList from "@/components/Notelist";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/notes`;

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
        setEditingId(null);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      }
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleEditClick = (note: Note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 font-sans text-black">
      <main className="max-w-3xl mx-auto flex flex-col gap-10">
        <NoteForm
          title={title}
          content={content}
          editingId={editingId}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit}
        />
        <NoteList
          notes={notes}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}