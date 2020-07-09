import React, { Component } from 'react';
import Wiki from './components/Search';
import Response from './components/Result';

class App extends Component {

  state = {
    filter : 'home_page', // word to search
    ids : '', //ids to searh
    episodes : [],
    characters : [],
    locations : [],
    locations_chars : [],
    page : '1', // first page
    max_page : '' // n° pages request
  }

  componentWillMount(){
    this.apiRequest()
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

  searchData =  (filter, page, ids) => {
    this.setState({
      filter,
      page,
      ids
    }, () =>{
      this.apiRequest();
    })
  }

  apiRequest = () => {
    const filter = this.state.filter;
    const page = this.state.page;
    const ids = this.state.ids;
    const url_character = `https://rickandmortyapi.com//api/character/?page=${page}&name=${filter}`;
    const url_character_id = `https://rickandmortyapi.com//api/character/${ids}`;


    const url_location = `https://rickandmortyapi.com//api/location/?page=${page}&name=${filter}`;
    const url_location_id = `https://rickandmortyapi.com//api/location/${ids}`

    const url_episode = `https://rickandmortyapi.com//api/episode/?name=${filter}`;
    const url_episode_id = `https://rickandmortyapi.com//api/episode/${ids}`

    if (filter === "home_page"){
      fetch(`https://rickandmortyapi.com//api/episode?page=${this.state.page}`)
      .then(response => response.json())
      .then(result => this.setState({ episodes : result.results , max_page : result.info.pages, requestEp_Failed: false }) )
    }

    else if (filter === "character_id"){
        fetch(url_character_id)
        .then(response => response.json())
        .then(result => this.setState({ characters : [{id: result.id, url: result.url, image: result.image, name: result.name, species: result.species, status: result.status, type: result.type, gender: result.gender, origin: result.origin, location: result.location,
        episode: result.episode}], locations: [], episodes: [], requestCharId_Failed: false }) )
        .catch((error) => { this.setState({ requestCharId_Failed: true })
        })
    }

    else if (filter === "location_id"){
      fetch(url_location_id)
      .then(response => response.json())
      .then(result => this.setState({ locations : [{id: result.id, name: result.name, type: result.type, dimension: result.dimension, residents: result.residents}], characters: [], requestLocId_Failed: false  }) )
      .catch((error) => { this.setState({ requestLocId_Failed: true })
      })
    }

    else if (filter === "episode_id"){
      fetch(url_episode_id)
      .then(response => response.json())
      .then(result => this.setState({ episodes : [{id: result.id, name: result.name, air_date: result.air_date, episode: result.episode, characters: result.characters}], characters: [], requestEpId_Failed: false  }) )
      .catch((error) => { this.setState({ requestEpId_Failed: true })
      })
    }


    else if (filter !== ""){

      fetch(url_character)
      .then(response => response.json())
      .then(result => this.setState({ characters : result.results , max_page : result.info.pages, requestChar_Failed: false }) )
      .catch((error) => {
        this.setState({ characters : [], requestChar_Failed: true })
      })

      fetch(url_location)
      .then(response => response.json())
      .then(result => this.setState({ locations : result.results , max_page : result.info.pages, requestLoc_Failed: false }) )
      .catch((error) => {
        this.setState({ locations : [], requestLoc_Failed: true })
      })

      fetch(url_episode)
      .then(response => response.json())
      .then(result => this.setState({ episodes : result.results, max_page : result.info.pages, requestEp_Failed: false }) )
      .catch((error) => {
        this.setState({ episodes : [], requestEp_Failed: true })
      })

    }

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
            episodes = {this.state.episodes}
            searchData = {this.searchData}
            nextPage = {this.nextPage}
            previewPage = {this.previewPage}
          />
        </div>

      </div>
    );
  }
}

export default App;
