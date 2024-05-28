import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;

    return (
      <div className="my-3">
        <div className="card">
          <img className="card-img-top" src={!imageUrl?"https://servicepath.co/wp-content/uploads/2019/11/news.jpg":imageUrl} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
