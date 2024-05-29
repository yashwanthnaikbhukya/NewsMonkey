import React, { Component } from "react";
import { NewsItem } from "./NewsItem";
import {Spinner} from "./Spinner"
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category : 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  
  constructor(){
    super();
    this.state={
      articles: [],
      loading: false,
      page: 1
    }
  }

  async updateNews(){
    console.log(`${this.state.page}`);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d343a854c394fe199f38762f00158f7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false
    })
  }

  async componentDidMount() {
    this.updateNews()
  }

  handlePrevClick = async () =>{
    this.setState({
      page: this.state.page - 1
      });
    this.updateNews();
  }

  handleNextClick = async () =>{
    this.setState({
      page: this.state.page + 1
      })
      this.updateNews()
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">{this.props.category.slice(0,1).toUpperCase() + this.props.category.slice(1).toLowerCase()}-News</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col-md-3" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author?"Unknown":element.author} date={element.publishedAt} source={element.source.name} />

          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
