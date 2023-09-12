import React, { useState } from "react";
import "./App.css";
import { TodoInput } from "./components/TodoInput";
import { TodoReduceProvider } from "./context/TodoReduceContext";

import { TodoList } from "./components/TodoListComp";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  return (
    <div className="App">
      <h1>나의 할일</h1>
      <div className="todo-wrapper">
        <TodoReduceProvider>
          <TodoInput></TodoInput>
          <div className="btn-area">
            <button
              type="button"
              className={`secondaryBtn ${
                isCompleteScreen === false && "active"
              }`}
              onClick={() => setIsCompleteScreen(false)}
            >
              해야할일
            </button>
            <button
              type="button"
              className={`secondaryBtn ${
                isCompleteScreen === true && "active"
              }`}
              onClick={() => setIsCompleteScreen(true)}
            >
              완료
            </button>
          </div>
          <TodoList isCompleteScreen={isCompleteScreen}></TodoList>
        </TodoReduceProvider>
      </div>
    </div>
  );
}

export default App;
