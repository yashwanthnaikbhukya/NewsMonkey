import React from "react";

const NewsItem = (props) => {

    let {title, description, imageUrl, newsUrl, author, date, source} = props;

    return (
      <div className="my-3">
        <div className="card">
        <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
          <img className="card-img-top" src={!imageUrl?"https://servicepath.co/wp-content/uploads/2019/11/news.jpg":imageUrl} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
