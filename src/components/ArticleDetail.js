import React from 'react';

const ArticleDetail = (props) => {
    return (
        <div className="TodoDetail">
            <div className="row">
                <div className="left">
                    Title:
                </div>
                <div className="right">
                    {props.title}
                </div>
            </div>
            <div className="row">
                <div className="left">
                    Content:
                </div>
                <div className="right">
                    {props.content}
                </div>
            </div>
            <div className="row">
                <div className="left">
                    AuthorID:
                </div>
                <div className="right">
                    {props.author_id}
                </div>
                <button onClick={props.clickDelete}>Delete</button>
            </div>
        </div>
    );
}

export default ArticleDetail;