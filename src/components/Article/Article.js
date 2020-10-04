import React from 'react';

const Article = props => {
    return (

        <div className='Article'>
            <div>article id: {props.id}</div>
        <div className={`text ${props.done && 'done'}`} onClick={props.clicked}>
            title: {props.title}
        </div>
            author: {props.name}
        </div>
    );
}

export default Article;