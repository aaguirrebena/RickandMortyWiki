import React, { Component } from 'react'
import CharInfo from './Character';
import PlanetInfo from './Location';
import EpisodeInfo from './Episode';
import Pages from './Pagination';

class Response extends Component {
    printResponse = () => {

        const characters = this.props.characters;
        const locations = this.props.locations;
        const episodes = this.props.episodes;
        const home = this.props.home

        return (
            <React.Fragment>
                <div className="col-12"> {/* p-5 row */}

                    {characters.map(character => (
                        <CharInfo
                            key={character.id}
                            character={character}
                            home = {home}
                            searchData={this.props.searchData}
                        />
                    ) ) }

                    {locations.map(location => (
                        <PlanetInfo
                            key={location.id}
                            location={location}
                            home = {home}
                            searchData={this.props.searchData}
                        />
                    ) ) }

                    {episodes.map(episode => (
                        <EpisodeInfo
                            key={episode.id}
                            episode={episode}
                            home = {home}
                            searchData={this.props.searchData}
                        />
                    ) ) }
                </div>

                <Pages
                    nextPage={this.props.nextPage}
                    previewPage={this.props.previewPage}
                />
            </React.Fragment>
        )
    }
    render() {
        return (
            <React.Fragment>
                { this.printResponse() }
            </React.Fragment>
        );
    }
}

export default Response;
