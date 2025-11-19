import React, { useMemo, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTasks, useTaskDispatch, TaskActions } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const filterMap = {
  All: (t) => true,
  Pending: (t) => !t.completed,
  Completed: (t) => t.completed,
};

function TaskList({ filter }) {
  const tasks = useTasks();
  const dispatch = useTaskDispatch();

  const filtered = useMemo(
    () => tasks.filter(filterMap[filter]),
    [tasks, filter]
  );

  const onToggle = useCallback(
    (id) => {
      dispatch({ type: TaskActions.TOGGLE, payload: { id } });
    },
    [dispatch]
  );

  const onDelete = useCallback(
    (id) => {
      dispatch({ type: TaskActions.DELETE, payload: { id } });
    },
    [dispatch]
  );

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      if (!destination) return;
      // No-op if nothing changed in visible list
      if (
        source.index === destination.index &&
        source.droppableId === destination.droppableId
      )
        return;

      // id in visible (filtered) list
      const movedId = filtered[source.index]?.id;
      if (!movedId) return;

      // copy global list
      const nextTasks = Array.from(tasks);

      // remove moved item in global list
      const removedIndexInGlobal = nextTasks.findIndex((t) => t.id === movedId);
      if (removedIndexInGlobal === -1) return;
      const [movedItem] = nextTasks.splice(removedIndexInGlobal, 1);

      // visible after removal
      const visibleAfterRemoval = filtered.filter((t) => t.id !== movedId);
      const destVisibleItem = visibleAfterRemoval[destination.index];

      if (destVisibleItem) {
        const destIndexInGlobal = nextTasks.findIndex(
          (t) => t.id === destVisibleItem.id
        );
        if (destIndexInGlobal === -1) {
          nextTasks.push(movedItem);
        } else {
          nextTasks.splice(destIndexInGlobal, 0, movedItem);
        }
      } else {
        nextTasks.push(movedItem);
      }

      dispatch({ type: TaskActions.REORDER, payload: nextTasks });
    },
    [tasks, filtered, dispatch]
  );

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks-droppable">
          {(droppableProvided) => (
            <div
              className="task-list"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {filtered.map((t, idx) => {
                // prefix id to be extra safe (avoid purely numeric or similar issues)
                const draggableId = `task-${String(t.id)}`;
                return (
                  <Draggable key={t.id} draggableId={draggableId} index={idx}>
                    {(provided, snapshot) => {
                      console.log("Draggable render", {
                        id: draggableId,
                        providedKeys: Object.keys(provided || {}),
                        snapshot,
                      });
                      return (
                        <TaskItem
                          task={t}
                          provided={provided}
                          snapshot={snapshot}
                          onToggle={onToggle}
                          onDelete={onDelete}
                        />
                      );
                    }}
                  </Draggable>
                );
              })}

              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TaskList;
