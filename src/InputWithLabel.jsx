// Functional react component
import React, { useEffect , useRef} from 'react';



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
}

export default InputWithLabel;