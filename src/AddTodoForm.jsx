// Functional react component
import React from 'react';

const AddTodoForm = () => {
    return(
        <form>
            <label htmlFor="Title"></label>
            <input type="text" id="Title"/>
            <button type="submit">Add</button>
        </form>
        
    );
};

export default AddTodoForm;