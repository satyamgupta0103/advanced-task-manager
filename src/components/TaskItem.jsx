import React from "react";

const TaskItem = ({ task, provided, snapshot, onToggle, onDelete }) => {
  // Defensive: provided might be undefined during some renders; handle gracefully
  const dragProps = provided?.draggableProps || {};
  const dragHandleProps = provided?.dragHandleProps || {};
  const innerRef = provided?.innerRef || (() => null);

  // Helpful debug: uncomment if you want to log provided props
  // console.log('TaskItem render', { id: task.id, provided, snapshot });

  return (
    <div
      ref={innerRef}
      {...dragProps}
      {...dragHandleProps}
      className={`task-card ${snapshot?.isDragging ? "dragging" : ""}`}
      style={dragProps.style}
      role="listitem"
      aria-roledescription="Draggable task"
      data-task-id={task.id}
      // temporary debug hook: logs mousedown with id
      onMouseDown={(e) => {
        // Prevent firing extra state updates during mouse down (avoid re-renders)
        // console.log('mousedown on', task.id);
      }}
    >
      <div
        className="task-left"
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`toggle-${task.id}`}
          onMouseDown={(e) => e.stopPropagation()} // avoid starting drag when interacting with checkbox
        />
        <div className={`task-title ${task.completed ? "completed" : ""}`}>
          {task.title}
        </div>
      </div>

      <div>
        <button
          className="icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          aria-label={`delete-${task.id}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
