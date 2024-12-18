import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './TodoList'; 
import AddTodoForm from './AddTodoForm'; 


const TodoListItem = ({ todo }) => {
  //with todo.title, does not display and with todo, displays properly
  return <li>{todo}</li>;
};

export default TodoListItem;




