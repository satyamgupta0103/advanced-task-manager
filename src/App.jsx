import React, { useState, useMemo } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Advanced Task Manager</h1>
          <div className="controls">
            <ThemeToggle />
          </div>
        </div>

        <TaskForm />

        <Filters filter={filter} setFilter={setFilter} />

        <TaskList filter={filter} />
      </div>
    </div>
  );
}
