import React, { useState, useCallback } from "react";
import { useTaskDispatch, TaskActions } from "../context/TaskContext";

function TaskForm() {
  const [value, setValue] = useState("");
  const dispatch = useTaskDispatch();

  const add = useCallback(
    (e) => {
      e.preventDefault();
      const title = value.trim();
      if (!title) return; // form validation: prevent empty
      dispatch({ type: TaskActions.ADD, payload: { title } });
      setValue("");
    },
    [value, dispatch]
  );

  return (
    <form className="task-form" onSubmit={add} aria-label="add-task-form">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default React.memo(TaskForm);
