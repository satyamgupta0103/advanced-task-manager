import React, { createContext, useReducer, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { uid } from "../utils/uid";

const TaskStateContext = createContext();
const TaskDispatchContext = createContext();

const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  REORDER: "REORDER",
  SET: "SET",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        { id: uid(), title: action.payload.title, completed: false },
        ...state,
      ];
    case ACTIONS.TOGGLE:
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      );
    case ACTIONS.DELETE:
      return state.filter((t) => t.id !== action.payload.id);
    case ACTIONS.REORDER:
      return action.payload;
    case ACTIONS.SET:
      return action.payload;
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [persisted, setPersistedState] = useLocalStorage("tasks", []);
  const [state, dispatch] = useReducer(reducer, persisted);

  useEffect(() => {
    // If reducer changes -> sync to persisted wrapper
    setPersistedState(state);
  }, [state, setPersistedState]);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskStateContext);
}

export function useTaskDispatch() {
  return useContext(TaskDispatchContext);
}

export const TaskActions = ACTIONS;
