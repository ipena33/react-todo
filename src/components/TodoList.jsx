// Functional react component
import React from 'react';
import TodoListItem from './TodoListItem'; 
import PropTypes from 'prop-types';


const TodoList = ({todoList, onRemoveTodo}) => {
    return(
        <ul>
            {todoList.map((item) => (<TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />))}
        </ul>
        
    );
};

TodoList.propTypes = {
    todoList: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;