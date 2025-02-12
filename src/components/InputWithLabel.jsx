// Functional react component
import React, { useEffect , useRef} from 'react';
import PropTypes from 'prop-types';



function InputWithLabel( {todoTitle, handleTitleChange, children} ){
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    });
    
    return(
        <>
            <label htmlFor="Title">{children}</label>
            <input name="title" type="text" id="Title" value={todoTitle} onChange={handleTitleChange} ref={inputRef}/>
        </>
    );
};

InputWithLabel.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};


export default InputWithLabel;
