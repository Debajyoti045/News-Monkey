import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewsItem extends Component {
  static propTypes = {
    sourceName: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
  };
  render() {
    let {
      sourceName,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
    } = this.props;
    return (
      <div>
        <div className="card my-2" style={{height:"65vh"}}>
          <img style={{height:"30vh"}} src={urlToImage} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                 By: {author} on &nbsp;
                {new Date(publishedAt).toLocaleString("en-US", {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </small>
            </p>
            <a href={url} target="_blank" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
