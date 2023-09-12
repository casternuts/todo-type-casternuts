import { useEffect } from "react";

import { useTodoState } from "../hooks/useTodoState";
import { useTodoDispatch } from "../hooks/useTodoDispatch";
import { TodoListItem } from "./TodoListItemComp";

export const TodoList = ({
  isCompleteScreen,
}: {
  isCompleteScreen: boolean;
}) => {
  const state = useTodoState();
  console.log(state);
  const dispatch = useTodoDispatch();

  //삭제
  const handleDeleteTodo = (index: number) => {
    dispatch({ type: "DELETE_TODOS", payload: index });
  };
  //삭제(완료한일)
  const handleDeleteCompleteTodo = (index: number) => {
    console.log(index);
    dispatch({ type: "DELETE_COMP_TODOS", payload: index });
  };
  //완료
  const handleComplete = (index: number) => {
    console.log(index);
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    let filteredItem = {
      ...state.allTodos[index],
      completedOn: completedOn,
    };
    dispatch({ type: "SET_COMP_TODOS", payload: filteredItem });

    handleDeleteTodo(index);
  };

  // 초기 데이터 로딩
  useEffect(
    () => {
      console.log("초기로딩");
      let savedTodo = localStorage.getItem("todolist") as string | null;
      let savedCompletedTodo = localStorage.getItem("completedTodos") as
        | string
        | null;
      savedTodo = savedTodo != null ? JSON.parse(savedTodo) : null;
      savedCompletedTodo =
        savedCompletedTodo != null ? JSON.parse(savedCompletedTodo) : null;

      if (savedTodo) {
        dispatch({ type: "SET_INIT_TODOS", payload: savedTodo });
      }
      if (savedCompletedTodo) {
        dispatch({ type: "SET_INIT_COMP_TODOS", payload: savedCompletedTodo });
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="todo-list">
      {/* 모든 할 일들 */}
      {isCompleteScreen === false &&
        state.allTodos.map((item, index) => (
          <TodoListItem
            key={index}
            isCompleteScreen={isCompleteScreen}
            item={item}
            index={index}
            handleDeleteTodo={handleDeleteTodo}
            handleDeleteCompleteTodo={handleDeleteCompleteTodo}
            handleComplete={handleComplete}
          ></TodoListItem>
        ))}
      {/* 완료 한 일들 */}
      {isCompleteScreen === true &&
        state.completeTodos.map((item, index) => (
          <TodoListItem
            key={index}
            isCompleteScreen={isCompleteScreen}
            item={item}
            index={index}
            handleDeleteTodo={handleDeleteTodo}
            handleDeleteCompleteTodo={handleDeleteCompleteTodo}
            handleComplete={handleComplete}
          ></TodoListItem>
        ))}
    </div>
  );
};
