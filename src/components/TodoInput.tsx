import { useState } from "react";
import { useTodoDispatch } from "../hooks/useTodoDispatch";
export const TodoInput = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const dispatch = useTodoDispatch();

  const handleAddTodo = () => {
    console.log("ddd");
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    dispatch({ type: "SET_TODOS", payload: newTodoItem });
  };

  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="제목"
        ></input>
      </div>
      <div className="todo-input-item">
        <label>설명</label>
        <input
          type="text"
          placeholder="설명"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        ></input>
      </div>
      <div className="todo-input-item">
        <button type="button" onClick={handleAddTodo} className="primaryBtn">
          추가
        </button>
      </div>
    </div>
  );
};
