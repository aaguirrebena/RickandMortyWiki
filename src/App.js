import React, { Component } from 'react';
import Wiki from './components/Search';
import Response from './components/Result';

class App extends Component {

  state = {
    filter : '', // word to search
    episodes : [],
    characters : [],
    locations : [],
    page : '1', // first page
    max_page : '' // n° pages request
  }

  scroll = () => {
    const element = document.querySelector('.jumbotron');
    element.scrollIntoView('instant', 'start');
  }

  nextPage = () => {
    // read actual state of the page
    let page = this.state.page;
    // new page ++, no puede pasar si esta en la ultima pagina
    if(page === this.state.max_page) return null;
    page ++;
    // refresh state
    this.setState({
      page
    }, () => {
      this.apiRequest()
      this.scroll()
    });
  }

  previewPage = () => {
    // read actual state of the page
    let page = this.state.page;
    // new page --, no puede retroceder estando en la primera pagina
    if(page === 1) return null;
    page --;
    // refresh state
    this.setState({
      page
    }, () => {
      this.apiRequest()
      this.scroll()
    });
  }

  searchData =  (filter, page) => {
    this.setState({
      filter,
      page
    }, () =>{
      this.apiRequest();
    })
  }

  apiRequest = () => {
    //"https://rickandmortyapi.com/api/{}" -> sample request
    const filter = this.state.filter;
    const page = this.state.page;
    // if(filter != "character") return null;
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    const url_character = `https://rickandmortyapi.com/api/character/?page=${page}&name=${filter}`;
    const url_location = `https://rickandmortyapi.com/api/location/?page=${page}&name=${filter}`;
    const url_episode = `https://rickandmortyapi.com/api/episode/?episode=${filter}`;

    // console.log(url);
    fetch(url_character)
    .then(response => response.json())
    .then(result => this.setState({ characters : result.results , max_page : result.info.pages }) )
    .catch((error) => {
      this.setState({ characters : [], requestFailed: true })
    })

    fetch(url_location)
    .then(response => response.json())
    .then(result => this.setState({ locations : result.results , max_page : result.info.pages }) )
    .catch((error) => {
      this.setState({ locations : [], requestFailed: true })
    })

    fetch(url_episode)
    .then(response => response.json())
    .then(result => this.setState({ episodes : result.results , max_page : result.info.pages }) )
    .catch((error) => {
      this.setState({ episodes : [], requestFailed: true })
    })

    if (filter === "character"){
    fetch(url)
    .then(response => response.json())
    .then(result => this.setState({ characters : result.results , max_page : result.info.pages }) )
    .catch((error) => {
      this.setState({ requestFailed: true })
  })}

  }

  render () {
    return (
      <div className="app container">

        <div className="jumbotron">
          <p className="lead text-center">Rick and Morty Wiki</p>
          <Wiki
            searchData={this.searchData}
          />
        </div>

        <div className="row justify-content-center">
          <Response
            characters = {this.state.characters}
            locations = {this.state.locations}
            episodes ={this.state.episodes}
            nextPage={this.nextPage}
            previewPage={this.previewPage}
          />
        </div>

      </div>
    );
  }
}

export default App;
