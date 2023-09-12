import { useContext } from "react";
import { TodoStateContext } from "../context/TodoReduceContext";
// State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useTodoState() {
  const state = useContext(TodoStateContext);
  if (!state) {
    throw new Error("Cannot find UsersProvider");
  }
  return state;
}
