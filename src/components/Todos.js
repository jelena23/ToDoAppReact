import React, { Fragment, useEffect, useState } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import { findByUserWithTags } from "../services/todo-service";
import AuthService from "../services/auth.service";

const Todos = () => {
  const currentUser = AuthService.getCurrentUser();
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  // adding new current todo, create
  const [currentTodo, setCurrentTodo] = useState({
    id: "",
    description: "Todo",
    dueD: Date.now(),
    dueT: new Date().getTime(),
    complete: false,
    userId: "",
  });
  const [status, setStatus] = useState("all");
  const [updateOn, setUpdateOn] = useState(false);

  useEffect(() => {
    const retrieveTodos = () => {
      findByUserWithTags(currentUser.id)
        .then((response) => {
          setTodos(response);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveTodos();
  }, [currentUser.id]);

  return (
    <Fragment>
      {/* <header>
        <h1>ToDo List</h1>
      </header> */}
      <Form
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
        currentTodo={currentTodo}
        setCurrentTodo={setCurrentTodo}
        updateOn={updateOn}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
        status={status}
        setStatus={setStatus}
        updateOn={updateOn}
        setUpdateOn={setUpdateOn}
      />
    </Fragment>
  );
};

export default Todos;
