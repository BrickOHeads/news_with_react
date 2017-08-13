import React, {Component} from 'react';
import './App.css';

class Feed extends Component {
  render() {
    // ********Receive state from parent component via props.
    let feed = this.props.feed
    let renderFeed = feed.map((article) => {
      // ********The API returns a blank img placeholder if there is no image.
      let imgUrl;
      if (article.urlToImage === 'http://assets1.ignimgs.com/2015/05/27/contentplaceholderpng-967b4c.png') {
        imgUrl = '../images/IGN_Entertainment_Logo.svg.png';
        console.log('hi')
      } else {
        imgUrl = article.urlToImage;
      }
      // *******Set variables for each article property.
      let author = article.author,
          description = article.description,
          title = article.title,
          url = article.url,
        // *******create a random string//********
          key = Math.random().toString(36).substring(7);
      return (
        <div key={key} className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img className="" src={imgUrl} alt={description}/>
            <div className="caption">
                  <p className="lead truncate">{title}</p>
                  <hr className="divider"/>
                  <p className="text-center truncate">{description}</p>
                  <span className="text-center pull-left">{author || 'IGN'}</span>
                  <a href={url} className="btn btn-danger" target="_blank">Read more!</a>
            </div>
          </div>
        </div>
      )
    });
    return (
      <div className="col-md-10 col-md-offset-1">
        <button className="btn btn-danger" onClick={this.props.onClick}>Click me!</button>
        <hr className="divider"/>
        <div className="col-md-12">
          <div className="row">
          {this.props.children}
          {renderFeed}
          </div>
        </div>
      </div>
    )
  }
}

class Loader extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="loader"></div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomFeed: [],
      feed: [],
      loader: <Loader/>,
      fav: ''
    }
    this.randomizer = this.randomizer.bind(this);
  }

  randomizer() {
    // *******We want to render a set of six random news headlines from the API data.
    // *******We can simply use Math.floor() to create a random set of healines, but
    // *******one side effect is that we get duplicates. Therefore, we use the method below to
    // ********remove duplicates.
    let newsFeed = this.state.feed;
    let tmp = newsFeed.slice(newsFeed);
    let randomArray = [];
    //*********** We use a for loop to iterate over the length of the array six time.
    // ********Then we grab a random news headline in each iteration, removing duplicates.
    for (let i = 0; i < 9; i++) {
      let index = Math.floor(Math.random() * tmp.length);
      let removed = tmp.splice(index, 1);
      // ********Since we are only removing one element
      randomArray.push(removed[0]);
    }
    // Set state. When the button is clicked, set the state for randomFeed and the loader.

  //   {this.setState.randomFeed}
  //   this.setState.loader
  // }
  this.setState ({
    randomFeed: randomArray,
    loader: ''
  })
}

  componentWillMount() {
  // *******Set your API URL with the API key.
  let url = "https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=9f23ca15a0b648f9a5dd1b6fa3cfce4b"
  // ********We use regex to extra website name. pop returns the last element of array
  let extract = url.match(/source=\=*(.*?)\s*&s/).pop();
  // *******We set site name to state.
  this.setState({site: extract})
  // *********Fetch data from API
  fetch(url).then((response) => {
    return response.json()
  }).then((data) => {
    let articles = data.articles;
    this.setState({feed: articles})
  });
}

render() {
  return (
    <div className="App row">
      <div className="col-md-12 hd">
        <h1 className="hd-title">{this.state.site}</h1>
        <h2 className="hd-sub">News Randomizer</h2>
      </div>

      <Feed
       feed={this.state.randomFeed}
       onClick={this.randomizer}
       loader={this.state.loader}
     />
    </div>
  );
}
}

export default App;
