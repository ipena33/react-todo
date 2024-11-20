// Functional react component
import React from 'react';

const todoList = [
    {id: 1, title: "Do homework"},
    {id: 2, title: "Go to work"},
    {id: 3, title: "Make dinner"},
  ];
  
const TodoList = () => {
    return(
        <ul>
        {todoList.map(item => (<li key={item.id}>{item.title}</li>))}
        </ul>
    );
};

export default TodoList;