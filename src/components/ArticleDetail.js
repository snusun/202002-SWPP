import React from 'react';

const ArticleDetail = (props) => {
    return (
        <div className="ArticleDetail">
            <div className="row">
                <div className="left">
                    Title:
                </div>
                <div className="title">
                    {props.title}
                </div>
            </div>
            <div className="row">
                <div className="left">
                    Content:
                </div>
                <div className="content">
                    {props.content}
                </div>
            </div>
            <div className="row">
                <div className="left">
                    AuthorID:
                </div>
                <div className="author_id">
                    {props.author_id}
                </div>
                <button onClick={props.clickDelete}>Delete</button>
            </div>
        </div>
    );
}

export default ArticleDetail;