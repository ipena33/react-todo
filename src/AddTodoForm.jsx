// Functional react component
import React from 'react';

const AddTodoForm = () => {
    return(
        <form>
            <label htmlFor="todoTitle"></label>
            <input type="text" id="todoTitle"/>
            <button type="submit">Add</button>
        </form>
        
    );
};

export default AddTodoForm;