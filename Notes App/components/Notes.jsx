import { useEffect, useState } from "react";
import { Note } from "./Note";

export const Notes = () => {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);

  const handleNewNote = () => {
    if (!input.trim()) return;
    const newNote = { id: Date.now(), text: input };
    setNotes([...notes, newNote]);
    setInput("");
  };

  const handleDeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const handleUpdate = (id, content) => {
    const newNotes = notes.map((note) => {
      return note.id === id ? { id: id, text: content } : note;
    });
    setNotes(newNotes);
  };

  useEffect(() => {
    const oldNotes = JSON.parse(localStorage.getItem("notes")) || [];
    if (oldNotes.length > 0) {
      setNotes(oldNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <h1>Notes App</h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <input
          type="text"
          value={input}
          placeholder="Enter your note here"
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%", height: "30px", textAlign: "center" }}
        />
        <button onClick={handleNewNote}>Add Note</button>
      </div>
      <div>
        {notes.map((note) => {
          return (
            <Note
              content={note.text}
              onDelete={() => handleDeleteNote(note.id)}
              onUpdate={(newContent) => handleUpdate(note.id, newContent)}
            />
          );
        })}
      </div>
    </div>
  );
};
