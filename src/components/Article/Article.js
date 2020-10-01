import React from 'react';

const Article = props => {
    return (

        <div className='Article'>
            <div>{props.id}</div>
        <div className={`text ${props.done && 'done'}`} onClick={props.clicked}>
            {props.title}
        </div>
        </div>
    );
}

export default Article;