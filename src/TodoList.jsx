// Functional react component
import React from 'react';
import TodoListItem from './TodoListItem'; 

const todoList = [
    {id: 1, title: "Do homework"},
    {id: 2, title: "Go to work"},
    {id: 3, title: "Make dinner"},
  ];
  
const TodoList = () => {
    return(
        <ul>
        {todoList.map((item => (<TodoListItem key={item.id} todo={item.title} />)))}
        </ul>
    );
}

export default TodoList;