import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const todoList = [
  {id: 1, title: "Do homework"},
  {id: 2, title: "Go to work"},
  {id: 3, title: "Make dinner"},
];

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(item => (<li key={item.id}>{items.title}</li>))}
      </ul>
    </div>
  );
}

export default App

