import { useState } from "react";

export const Note = ({ content, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  const handleUpdate = () => {
    setIsEditing(false);
    onUpdate(currentContent);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        border: "3px solid black",
        padding: 10,
        margin: 10,
      }}
    >
      {!isEditing && (
        <div>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "flex-start",
            }}
          >
            {content}
          </span>
          <button onClick={onDelete} style={{ margin: 8 }}>
            Delete Note
          </button>
          <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
        </div>
      )}

      {isEditing && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <input
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};
