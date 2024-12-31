import { useState, useEffect} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './TodoList'; 
import AddTodoForm from './AddTodoForm'; 



function App() {
  // const [todoList, setTodoList] = useState(() => {
  // const savedTodoList = localStorage.getItem("savedTodoList");
  // return savedTodoList ? JSON.parse(savedTodoList) : [];
  // });

  // state function holds list of todos
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    new Promise((resolve, reject) => {
      // mimic loading delay
      setTimeout(() => {
        //calling parameter resolve which is a callback function for when Promise is successful
        resolve( {data: {todoList : JSON.parse(localStorage.getItem("savedTodoList"))}} ) //pass object with property data as a nested empty object
      }, 2000);
    })
    .then((result) => {
      setTodoList(result.data.todoList)
      // turn loading off once data has been fetched
      setIsLoading(false);
    });
  }, []); //empty dependency array

  // save the todoList to localStorage so it stays after refreshing
  useEffect(() => {

    if (isLoading != true){
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);
 
  //return [todoList, setTodoList];
  

  function addTodo(newTodo){
    // add new items and keep old items too
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id){
    // get todo from todoList array
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <>
      <h1>Todo List</h1> 
      {/* Using a ternary operator inside JSX, if isLoading is true render the loading message, otherwise render the TodoList component */}
      { isLoading ? 
      (<p>Loading...</p>) 
      : <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
      }
      <AddTodoForm onAddTodo={addTodo}/>
    </>
  );
}

export default App;

