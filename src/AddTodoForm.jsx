// Functional react component
import React, { useState } from 'react';



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
            <label htmlFor="Title">Title</label>
            <input name="title" type="text" id="Title" value={todoTitle} onChange={handleTitleChange}/>
            <button type="submit">Add</button>
        </form>
        
    );
}


export default AddTodoForm;