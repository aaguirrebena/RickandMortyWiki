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
    home : true,
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

  searchData =  (filter, page, ids, home) => {
    this.setState({
      filter,
      page,
      ids,
      home
    }, () =>{
      this.apiRequest();
    })
  }

  apiRequest = () => {
    const filter = this.state.filter;
    const page = this.state.page;
    const ids = this.state.ids;
    const url = "https://rickandmortyapi.com/graphql";

    if (filter === "home_page"){

      fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: `
                query {
                  episodes(page:${page}){
                    info{
                      pages
                    }
                    results{
                      air_date
                      characters{
                        id
                        name
                      }
                      created
                      episode
                      id
                      name
                    }
                  }
                }
            `
        })
      })
      .then(res => res.json())
      .then(data => this.setState({ episodes : data.data.episodes.results , max_page : data.data.episodes.info.pages, home : true, requestEp_Failed: false }))

    }

    else if (filter === "character_id"){

        fetch(url, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              query: `
              query {
                character(id:${ids}) {
                  id
                  image
                  name
                  species
                  status
                  type
                  gender
                  location{
                    id
                    name
                  }
                  origin{
                    id
                    name
                  }
                  episode{
                    id
                    name
                  }
                }
              }
              `
          })
        })
        .then(res => res.json())
        .then(result => this.setState({ characters : [{id: result.data.character.id, image: result.data.character.image, name: result.data.character.name, species: result.data.character.species, status: result.data.character.status, type: result.data.character.type, gender: result.data.character.gender, origin: result.data.character.origin, location: result.data.character.location,
        episode: result.data.character.episode}], home : false, locations: [], episodes: [], requestCharId_Failed: false }))
    }

    else if (filter === "location_id"){

      fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: `
            query {
              location(id:${ids}) {
                 id
                name
                type
                dimension
                residents{
                  id
                  name
                }
              }
            }
            `
        })
      })
      .then(response => response.json())
      .then(result => this.setState({ locations : [{id: result.data.location.id, name: result.data.location.name, type: result.data.location.type, dimension: result.data.location.dimension, residents: result.data.location.residents}], home: false, characters: [], episodes: [], requestLocId_Failed: false  }))
      .catch((error) => { this.setState({ requestLocId_Failed: true })
      })
    }

    else if (filter === "episode_id"){

      fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: `
            query {
              episode(id:${ids}) {
                id
                name
                air_date
                characters{
                  id
                  name
                }
              }
            }
            `
        })
      })
      .then(response => response.json())
      .then(result => this.setState({ episodes : [{id: result.data.episode.id, name: result.data.episode.name, air_date: result.data.episode.air_date, episode: result.data.episode.episode, characters: result.data.episode.characters}], home : false, characters: [], locations: [], requestEpId_Failed: false  }) )
      .catch((error) => { this.setState({ requestEpId_Failed: true })
      })
    }

    else if (filter !== ""){ //Filter by part of Name

      // Characters by Name
      fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: `
            query {
              characters(page:${page}, filter: {name:"${filter}"}) {
                  info{
                    pages
                    count
                  }
                  results{
                      id
                      image
                      name
                      species
                      status
                      type
                      gender
                      location{
                        id
                        name
                      }
                      origin{
                        id
                        name
                      }
                      episode{
                        id
                        name
                      }
                  }
        			}
            }
            `
        })
      })
      .then(res => res.json())
      .then(result => this.setState({ characters : result.data.characters.results , max_page : result.data.characters.info.pages, home: true, requestChar_Failed: false }) )
      .catch((error) => {
        this.setState({ characters : [], home : true, requestChar_Failed: true })
      })

      // Locations by Name
      fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: `
              query {
                locations(page:${page}, filter: {name:"${filter}"}) {
                    info{
                      pages
                      count
                    }
                    results{
                      id
                      name
                      type
                      dimension
                      residents{
                        id
                        name
                      }
                    }
                }
              }
            `
        })
      })
      .then(response => response.json())
      .then(result => this.setState({ locations : result.data.locations.results , max_page : result.data.locations.info.pages, home : true, requestLoc_Failed: false }) )
      .catch((error) => {
        this.setState({ locations : [], home : true, requestLoc_Failed: true })
      })

      // Episodes by Name
      fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: `
            query {
              episodes(page:${page}, filter: {name: "${filter}"}){
                info{
                  pages
                }
                results{
                  air_date
                  characters{
                    id
                    name
                  }
                  created
                  episode
                  id
                  name
                }
              }
            }
            `
        })
      })
      .then(response => response.json())
      .then(result => this.setState({ episodes : result.data.episodes.results, max_page : result.data.episodes.info.pages, home: true, requestEp_Failed: false }))
      .catch((error) => {
        this.setState({ episodes : [], home : true, requestEp_Failed: true })
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
            home = {this.state.home}
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
