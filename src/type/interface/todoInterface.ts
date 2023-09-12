// 각 todo의 interface
interface TodoItemInterface {
  title: string;
  description: string;
  completedOn?: string;
}

// reducer에서 사용할 state의 interface를 정의
interface StateInterface {
  allTodos: TodoItemInterface[];
  completeTodos: TodoItemInterface[];
}

// Action의 interface를 정의
interface Action {
  type: string;
  payload?: any;
}

export type { TodoItemInterface, StateInterface, Action };
