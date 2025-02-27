import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './TodoList'; 
import AddTodoForm from './AddTodoForm'; 
import style from './TodoListItem.module.css';

const TodoListItem = ({ todo, onRemoveTodo }) => {
  //with todo.title, does not display and with todo, displays properly
  return (
  <li className= {style.ListItem}>
    {todo.title}
    <button type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button>
  </li>
  );
};

export default TodoListItem;




