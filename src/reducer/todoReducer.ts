import { StateInterface, Action } from "../type/interface/todoInterface";
import {
  SET_INIT_TODOS,
  SET_INIT_COMP_TODOS,
  SET_TODOS,
  SET_TODOS_COMPLETE,
  SET_COMP_TODOS,
  DELETE_TODOS,
  DELETE_COMP_TODOS,
} from "../action/todoActions";

const setTodos = (state: StateInterface, action: Action) => {
  let statemap = {
    ...state,
    allTodos: [...state.allTodos, action.payload],
  };
  localStorage.setItem("todolist", JSON.stringify(statemap.allTodos));
  return statemap;
};
const setCompTodos = (state: StateInterface, action: Action) => {
  let statemap = {
    ...state,
    completeTodos: [...state.completeTodos, action.payload],
  };
  localStorage.setItem(
    "completedTodos",
    JSON.stringify(statemap.completeTodos)
  );
  return statemap;
};
const setTodosComplete = (state: StateInterface, action: Action) => {
  let statemap = {
    ...state,
    allTodos: [...state.completeTodos, action.payload],
  };
  localStorage.setItem("completedTodos", JSON.stringify(statemap.allTodos));
  return statemap;
};
const setDelTodos = (state: StateInterface, action: Action) => {
  let statemap = {
    ...state,
    allTodos: state.allTodos.filter((todo, index) => index !== action.payload),
  };
  localStorage.setItem("todolist", JSON.stringify(statemap.allTodos));
  return statemap;
};
const setDelCompTodos = (state: StateInterface, action: Action) => {
  console.log(state);
  let statemap = {
    ...state,
    completeTodos: state.completeTodos.filter(
      (todo, index) => index !== action.payload
    ),
  };
  localStorage.setItem(
    "completedTodos",
    JSON.stringify(statemap.completeTodos)
  );
  return statemap;
};

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
export function todoReducer(state: StateInterface, action: Action) {
  switch (action.type) {
    case SET_INIT_TODOS:
      return {
        ...state,
        allTodos: action.payload,
      };
    case SET_INIT_COMP_TODOS:
      return {
        ...state,
        completeTodos: action.payload,
      };
    case SET_TODOS:
      return setTodos(state, action);
    case SET_TODOS_COMPLETE:
      return setTodosComplete(state, action);
    case SET_COMP_TODOS:
      return setCompTodos(state, action);
    case DELETE_TODOS:
      return setDelTodos(state, action);
    case DELETE_COMP_TODOS:
      return setDelCompTodos(state, action);
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}
