// Functional react component
import React from 'react';

const AddTodoForm = (props) => {
    function handleAddTodo(event) {
        event.preventDefault(); //prevents default form submission
        const todoTitle = event.target.title.value;
        console.log("Todo Title:", todoTitle);
        props.onAddTodo(todoTitle);
        // reset form so input is cleared
        event.target.reset(); 
    }

    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="Title"></label>
            <input name="title" type="text" id="Title"/>
            <button type="submit">Add</button>
        </form>
        
    );
}


export default AddTodoForm;