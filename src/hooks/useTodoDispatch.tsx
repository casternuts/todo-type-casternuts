import React, { useMemo, createContext, useReducer, useContext } from "react";
import { TodoDispatchContext } from "../context/TodoReduceContext";

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useTodoDispatch() {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UsersProvider");
  }
  return dispatch;
}
