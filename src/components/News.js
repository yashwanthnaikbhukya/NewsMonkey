import React, { Component } from "react";
import { NewsItem } from "./NewsItem";
import {Spinner} from "./Spinner"
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
  
  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `News Monkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => this.updateNews()  // Callback to run after state is updated
    );
  }
  
  handleNextClick = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => this.updateNews()  // Callback to run after state is updated
    );
  }

  fetchMoreData = async() => {
    this.setState(prevState => ({
        page: prevState.page + 1
    }), async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: (this.state.articles || []).concat(parsedData.articles || []),
            totalResults: parsedData.totalResults || 0
        });
    });
};


  render() {
    return (
      <>
        <h2 className="text-center">{this.props.category.slice(0,1).toUpperCase() + this.props.category.slice(1).toLowerCase()}-News</h2>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
        dataLength={this.state.articles? this.state.articles.length : 0}
        next={this.fetchMoreData}
        hasMore={ this.state.articles && this.state.articles.length !== this.state.totalResults}
        loader={<Spinner/>}
        >

        <div className="container">
        <div className="row">
        {this.state.articles && this.state.articles.map((element) => {
          return <div className="col-md-3" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author?"Unknown":element.author} date={element.publishedAt} source={element.source.name} />

          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

      </>
    );
  }
}

export default News;
