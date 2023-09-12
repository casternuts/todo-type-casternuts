import React, { Dispatch, useMemo, createContext, useReducer } from "react";
import { StateInterface, Action } from "../type/interface/todoInterface";
import { todoReducer } from "../reducer/todoReducer";
// State 용 Context 와 Dispatch 용 Context 따로 만들어주기
export const TodoStateContext = createContext<StateInterface | null>(null);
//reducer에 할당할 타입 생성
type TodosDispatch = Dispatch<Action>;
export const TodoDispatchContext = createContext<TodosDispatch | null>(null);

const initialState: StateInterface = {
  allTodos: [],
  completeTodos: [],
};

// 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
export function TodoReduceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { allTodos, completeTodos } = state;

  const value = useMemo(
    () => ({ allTodos, completeTodos }),
    [allTodos, completeTodos]
  );

  return (
    <TodoStateContext.Provider value={value}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
