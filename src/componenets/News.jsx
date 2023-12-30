import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  static defaultProps = {
    country: "in",
    category: "business",
    pageSize: 20,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      totalResults: 1,
      pageNo: 1,
      loading: false,
    };
  }
  async componentDidMount() {
    this.loadContent(this.state.pageNo);
  }
  handlePrev = ()=>{
    this.setState({
      pageNo: this.state.pageNo-1
    })
    this.loadContent(this.state.pageNo-1);
  }
  handleNext = ()=>{
    this.setState({
      pageNo: this.state.pageNo+1
    })
    this.loadContent(this.state.pageNo+1);
  }
  loadContent = async (pageNo)=>{
    this.props.setProgress(0);
    this.setState({
      loading: true,
    });
    this.props.setProgress(10);
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`
    );
    this.props.setProgress(30);
    let parsedData = await response.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    });
    this.props.setProgress(70);
    document.title = `NewsMonkey - ${this.props.category}`
    this.props.setProgress(100);
  }
  render() {
    return (
      <div className="container my-3">
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <h2 className="text-center" style={{marginTop:"64px"}}>
            {`NewsMonkey: Your daily dose of ${this.props.category} news`}
          </h2>
        )}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              if (
                element.title &&
                element.description &&
                element.url &&
                element.urlToImage
              ) {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      sourceName={element.source.name}
                      author={element.author}
                      title={element.title.slice(0, 40)}
                      description={element.description.slice(0, 80)}
                      url={element.url}
                      urlToImage={element.urlToImage}
                      publishedAt={element.publishedAt}
                    />
                  </div>
                );
              }
            })}
         {!this.state.loading && <div className="d-grid gap-2 d-md-flex justify-content-md-end my-3">
            <button disabled={this.state.pageNo==1} onClick={this.handlePrev} className="btn btn-primary me-md-2" type="button">
              &larr; Prev
            </button>
            <button  disabled={Math.ceil(this.state.totalResults/this.props.pageSize)==this.state.pageNo} onClick={this.handleNext} className="btn btn-primary" type="button">
              Next &rarr;
            </button>
          </div>}
        </div>
      </div>
    );
  }
}
