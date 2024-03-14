import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  title: string;
  description: string;
  time: string;
  completed: boolean;
}
interface TempHold {
  todo: Todo[];
  navigate: string;
}
interface TodoSate {
  todo: Todo[];
  popUp: boolean;
  tempHold: TempHold;
  updateTempHold: Todo[];
  trash: Todo[];
}
const databaseKey = {
  todo: "todo",
  trash: "trash",
};
const saveTodo = (todo: Todo[]) => {
  localStorage.setItem(databaseKey.todo, JSON.stringify(todo));
};
const getTodo = (): Todo[] => {
  return JSON.parse(localStorage.getItem(databaseKey.todo));
};
const saveTrashTodo = (todo: Todo[]) => {
  localStorage.setItem(databaseKey.trash, JSON.stringify(todo));
};
const getTrashTodo = (): Todo[] => {
  const todo = JSON.parse(localStorage.getItem(databaseKey.trash));
  return todo ? todo : [];
};

const initialState: TodoSate = {
  todo: getTodo(),
  popUp: true,
  tempHold: {
    todo: getTodo(),
    navigate: "INBOX",
  },
  updateTempHold: [],
  trash: getTrashTodo(),
};
const getId = () => {
  return Math.floor(Math.random() * 9999);
};
// CONSTANT
const [INBOX, TODAY, UPCOMING, COMPLETED, TRASH] = [
  "INBOX",
  "TODAY",
  "UPCOMING",
  "COMPLETED",
  "TRASH",
];

const tempHoldTodo = (state: any, holder: Todo[], navigate = INBOX) => {
  return (state.tempHold.todo = holder), (state.tempHold.navigate = navigate);
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addOrUpdateTodo: (state, actions: PayloadAction<Todo>) => {
      const payload = actions.payload;
      if (payload.id) {
        const index = state.todo.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          state.todo[index] = { ...payload };
        }
      } else {
        const newTodo = {
          ...payload,
          id: getId(),
          completed: false,
        };
        state.todo.unshift(newTodo);
      }
      saveTodo(state.todo);
      tempHoldTodo(state, state.todo);
    },
    removeTodo: (state, actions: PayloadAction<any>) => {
      const navigate = state.tempHold.navigate;
      //   REMOVE TODO FROM TODO
      if (navigate === INBOX) {
        const index = state.todo.findIndex(
          (todo) => todo.id === actions.payload.id
        );
        if (index !== -1) {
          state.trash = [state.todo[index], ...state.trash];
          saveTrashTodo(state.trash);
        }
        state.todo = state.todo.filter(
          (todo) => todo.id !== actions.payload.id
        );
        tempHoldTodo(state, state.todo, INBOX);
        saveTodo(state.todo);
      }
      //   REMOVE TODO FROM TRASH
      if (navigate === TRASH) {
        state.trash = state.trash.filter(
          (todo) => todo.id !== actions.payload.id
        );
        tempHoldTodo(state, state.trash, TRASH);
        saveTrashTodo(state.trash);
      }
    },
    // HOLD  TODO FOR UPDATE AND AUTO SET VALUE
    holdTodo: (state, actions: PayloadAction<any>) => {
      state.updateTempHold = actions.payload;
      state.popUp = !state.popUp;
      tempHoldTodo(state, state.todo);
    },
    // TOGGLE  ADD NEW TODO MODEL
    togglePopUp: (state) => {
      state.popUp = !state.popUp;
    },
    // NAVIGATE PAGE
    navigateTodo: (state, actions: PayloadAction<string>) => {
      const navigate = actions.payload;
      let filteredTodos: Todo[] = [];
      switch (navigate) {
        case INBOX:
          filteredTodos = state.todo;
          break;
        case TODAY:
          filteredTodos = state.todo.filter(
            (todo) => new Date(todo.time).getDate() === new Date().getDate()
          );
          break;
        case UPCOMING:
          filteredTodos = state.todo.filter(
            (todo) => new Date(todo.time).getTime() > new Date().getTime()
          );
          break;
        case COMPLETED:
          filteredTodos = state.todo.filter((todo) => todo.completed === true);
          break;
        case TRASH:
          filteredTodos = state.trash;
          break;
        default:
          filteredTodos = [];
          break;
      }
      tempHoldTodo(state, filteredTodos, navigate);
    },
    // handle to complete todo
    completedTodo: (state, actions: PayloadAction<number>) => {
      const index = state.todo.findIndex((todo) => todo.id === actions.payload);
      if (index !== -1) {
        state.todo[index].completed = !state.todo[index].completed;
      }
      state.tempHold.todo = state.todo;
      saveTodo(state.todo);
    },
    // search todo by title
    searchTodo: (state, actions: PayloadAction<any>) => {
      const navigate = state.tempHold.navigate;
      const query = actions.payload;
      let filteredTodos: Todo[] = [];
      switch (navigate) {
        case INBOX:
          filteredTodos = state.todo.filter((todo) =>
            todo.title.includes(query)
          );
          break;
        case TODAY:
          filteredTodos = state.todo.filter(
            (todo) =>
              new Date(todo.time).getDate() === new Date().getDate() &&
              todo.title.includes(query)
          );
          break;
        case UPCOMING:
          filteredTodos = state.todo.filter(
            (todo) =>
              new Date(todo.time).getTime() > new Date().getTime() &&
              todo.title.includes(query)
          );
          break;
        case COMPLETED:
          filteredTodos = state.todo.filter(
            (todo) => todo.completed === true && todo.title.includes(query)
          );
          break;
        case TRASH:
          filteredTodos = state.trash.filter((todo) =>
            todo.title.includes(query)
          );
          break;
        default:
          filteredTodos = [];
          break;
      }
      tempHoldTodo(state, filteredTodos, navigate);
    },
  },
});
export const {
  addOrUpdateTodo,
  removeTodo,
  holdTodo,
  navigateTodo,
  togglePopUp,
  completedTodo,
  searchTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
