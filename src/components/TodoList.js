import React, { useEffect, useCallback, useState } from "react";
import Todo from "./Todo";
import UpdateDialog from "./UpdateDialog";

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  status,
  setFilteredTodos,
  updateOn,
  setUpdateOn,
  setStatus,
}) => {
  // Nouc (ci, ci ci, ci): Array.isArray

  // changing selected todo, update
  const [selectedTodo, setSelectedTodo] = useState({
    id: "",
    description: "Todo",
    dueD: Date.now(),
    dueT: new Date().getTime(),
    complete: false,
    userId: "",
  });

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.complete === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter((todo) => todo.complete === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };

    filterHandler();
  }, [todos, status, setFilteredTodos]);

  const handleSelectTodo = useCallback((chosenTodo) => {
    setSelectedTodo(chosenTodo);
    setUpdateOn(true);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos?.map((todo) => (
          <Todo
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
            todo={todo}
            updateOn={updateOn}
            setUpdateOn={setUpdateOn}
            setStatus={setStatus}
            handleSelectTodo={handleSelectTodo}
          />
        ))}
        <UpdateDialog
          updateOn={updateOn}
          setUpdateOn={setUpdateOn}
          todos={todos}
          setTodos={setTodos}
          setStatus={setStatus}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      </ul>
    </div>
  );
};
export default TodoList;
