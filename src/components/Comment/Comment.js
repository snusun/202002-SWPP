import React from 'react';

const Comment = props => {
    debugger;
    return (
        <div className='Comment'>
            <div>author name: {props.authorName}</div>
            <div>Content: {props.content}</div>
            <div>
                <button id='edit-comment-button' onClick={props.clickedEdit}>edit</button> 
                <button id='delete-comment-button' onClick={props.clickedDelete}>delete</button>
            </div>
        </div>
    );
}

export default Comment;