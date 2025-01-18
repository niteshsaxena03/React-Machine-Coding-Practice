import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";

export const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  const handleNewTask = () => {
    if (!input) return;
    setTodoList([...todoList, { id: Date.now(), text: input }]);
    setInput("");
  };
  const handleDeleteTask = (id) => {
    const newTodo = todoList.filter((item) => item.id !== id);
    setTodoList(newTodo);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todo")) || [];
    setTodoList(savedTodos);
  }, []);

  useEffect(() => {
    if (todoList.length) {
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  }, [todoList]);

  return (
    <div>
      <div>
        <h1>Todo List</h1>
        <h2>Enter your today's tasks</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "70%", height: "30px" }}
        />
        <button
          onClick={handleNewTask}
          style={{ margin: 10, height: 30, backgroundColor: "yellow" }}
        >
          Add Task
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {todoList.map((item) => {
          return (
            <TodoItem
              content={item.text}
              onDelete={() => handleDeleteTask(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
