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
  const [sortOrder, setSortOrder] = useState("asc");

  //toggle function to sort the order
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const fetchData = async() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`}
    }
    const url = 
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`;
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      // Sort data.records
      const sortedTodos = data.records.sort((objectA, objectB) => {
        const titleA = objectA.fields.title.toLowerCase();
        const titleB = objectB.fields.title.toLowerCase();
        if (titleA < titleB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (titleA > titleB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0; 
      });                                                         
      console.log(sortedTodos);
      const todos = sortedTodos.map((record) => {
          const newTodo = {
              id: record.id,
              title: record.fields.title
          };
          return newTodo;
      });
      setTodoList(todos);
      setIsLoading(false);
  
    } catch (error) {
      console.log(error.message);
    }
  }
  //fetchData ends  ### !!!!
 
  useEffect(() => {
    fetchData();
  }, [sortOrder]); //empty dependency array (useffect only fires once on each mount)

  // save the todoList to localStorage so it stays after refreshing
  useEffect(() => {
    if (isLoading != true){
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);
 
  //return [todoList, setTodoList];
  

  const addTodo = async (newTodo) => {
    // add new items and keep old items too
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        },
      }),
    };
    const url =
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const message = `Error: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
  
        // Adding the new todo to state after adding to airtable
        const addedTodo = {
          id: data.id,
          title: data.fields.title,
        };
  
        setTodoList((prevTodos) => [...prevTodos, addedTodo]);
      } catch (error) {
        console.log('Error adding todo:', error.message);
      }
    };
  

  const removeTodo = async(id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      // get todo 
      const newTodoList = todoList.filter(todo => todo.id !== id);
      setTodoList(newTodoList);
    } catch(error){
      console.log('Error deleting todo:', error.message);
    }
  };

  return (
  
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={
              <>
                <h1>Todo List</h1> 
                <AddTodoForm onAddTodo={addTodo}/>
            
                {/* Using a ternary operator inside JSX, if isLoading is true render the loading message, otherwise render the TodoList component */}
                { isLoading ? (
                <p>Loading...</p> ) 
                : (<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
                {/* Toggle button */}
                <button onClick={toggleSortOrder}>
                  Toggle Sort Order: {sortOrder === "asc" ? "Ascending" : "Descending"}
                </button>
                
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

