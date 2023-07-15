import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const {
    loading,
    error,
    item: todos,
    saveItem: saveTodos,
  } = useLocalStorage("TODOS_V1", []);

  const [searchValue, setSearchValue] = React.useState("");
  const [modalState, setModalState] = React.useState("none");

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const searchedTodos = todos.filter((todo) =>
    RegExp(`.*${searchValue}.*`, "i").test(todo.text)
  );

  const competeTodo = (text) => () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const createTodo = (text) => {
    if (text !== "") {
      const newTodos = [...todos];
      const newTodo = {
        text,
        completed: false,
      };
      newTodos.unshift(newTodo);
      saveTodos(newTodos);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        modalState,
        setModalState,
        createTodo,
        competeTodo,
        deleteTodo,
        loading,
        error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
