import { useState, useEffect} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './TodoList'; 
import AddTodoForm from './AddTodoForm'; 


function useSemiPersistentState(){
    // state function holds list of todos
    const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  // save the todoList to localStorage so it stays after refreshing
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
  
}

function App() {

  const [todoList, setTodoList] = useSemiPersistentState ();

  function addTodo(newTodo){
    // add new items and keep old items too
    setTodoList([...todoList, newTodo]);
  }

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todoList={todoList}/>
      <AddTodoForm onAddTodo={addTodo}/>
    </>
  );
}

export default App;