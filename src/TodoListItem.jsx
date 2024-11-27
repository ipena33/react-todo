import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './TodoList'; 
import AddTodoForm from './AddTodoForm'; 


function TodoListItem(props) {

  return (
    <li>{props.todo}</li>
  );
}

export default TodoListItem;

