import React from 'react';

const Comment = props => {
    debugger;
    return (
        <div className='Comment'>
            <div>author name: {props.authorName}</div>
            <div>Content: {props.content}</div>
        </div>
    );
}

export default Comment;