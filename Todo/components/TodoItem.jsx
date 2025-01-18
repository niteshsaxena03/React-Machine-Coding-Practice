import { useState } from "react";

export const TodoItem = ({ content, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <div
      style={{
        border: "1px solid black",
        width: "90%",
        fontSize: 25,
        margin: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: isCompleted ? "pink" : "",
      }}
    >
      {content}
      <button onClick={onDelete}>Delete Task</button>
      <button onClick={() => setIsCompleted(!isCompleted)}>
        {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
    </div>
  );
};
