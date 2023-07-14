import React from "react";
import { TodoCounter } from "./components/TodoCounter/TodoCounter";
import { TodoSearch } from "./components/TodoSearch/TodoSearch";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton/CreateTodoButton";
import { CreateTodo } from "./components/CreateTodo/CreateTodo";

const defaultTodos = [
  {
    text: "Cortar cebolla",
    completed: true,
  },
  {
    text: "Tomar el Curso de Intro a React.js",
    completed: false,
  },
  {
    text: "Llorar con la Llorona",
    completed: true,
  },
  {
    text: "Ver Lalaland",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState("");
  const [modalState, setModalState] = React.useState("none");
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const searchedTodos = todos.filter((todo) =>
    RegExp(`.*${searchValue}.*`, "i").test(todo.text)
  );

  const competeTodo = (text) => () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (text) => () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <TodoCounter completed={completedTodos} total={totalTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={competeTodo(todo.text)}
            onDelete={deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton setModalState={setModalState} />
      <CreateTodo
        todos={todos}
        setTodos={setTodos}
        modalState={modalState}
        setModalState={setModalState}
      />
    </>
  );
}

export default App;
