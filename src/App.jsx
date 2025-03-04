import { useState, useEffect} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './components/TodoList'; 
import AddTodoForm from './components/AddTodoForm'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  // state function holds list of todos
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`}           
    } 
    const url = 
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      console.log(data);
      console.log(options); 
      console.log(import.meta.env.VITE_AIRTABLE_API_TOKEN);
      console.log(import.meta.env.VITE_AIRTABLE_BASE_ID);
      console.log(import.meta.env.VITE_TABLE_NAME);
      const todos = data.records.map((record) => {
          const newTodo = {
              id: record.id,
              title: record.fields.title
          }
          return newTodo;
          });
          setTodoList(todos);
          setIsLoading(false);
 
    } catch (error) {
        console.log(error.message);
    }
  }  //fetchData ends  ### !!!!
 
  useEffect(() => {
    fetchData();
  }, []); //empty dependency array (useffect only fires once on each mount)

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
  
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={
              <>
                <h1>Todo List</h1> 
                {/* Using a ternary operator inside JSX, if isLoading is true render the loading message, otherwise render the TodoList component */}
              { isLoading ? (
              <p>Loading...</p> ) 
              : (<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
              <AddTodoForm onAddTodo={addTodo}/>
              </>
            }     
          />
          <Route
            path="/new"
            element={
              <h1>New Todo List</h1> 
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

