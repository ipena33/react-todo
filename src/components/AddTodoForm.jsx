// Functional react component
import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel'; 
import PropTypes from 'prop-types';



const AddTodoForm = ({onAddTodo}) => {
    // state variable
    const [todoTitle, setTodoTitle] = useState("");

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault(); //prevents default form submission
        console.log("Todo Title:", todoTitle);
        const newTodo = {  //todo object with title and id
            title: todoTitle,
            id: Date.now(),
        };
        onAddTodo(newTodo); //new object added to callback
        // reset form so input is cleared
        setTodoTitle(""); 
    }

    return(
        <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
                Todo {/* passing title as children*/}
            </InputWithLabel>
            <button type="submit">Add</button>
        </form>
        
    );
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};


export default AddTodoForm;