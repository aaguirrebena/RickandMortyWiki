import React from 'react';

const EpisodeInfo = (props) => {

    const {id, name, air_date, episode, characters} = props.episode;
    const home = props.home

    function handleCharacter (e, characterId) {
        e.preventDefault();

        props.searchData("character_id", "1", characterId);
    }

    function handleEpisode (e, episodeId) {
        e.preventDefault();

        props.searchData("episode_id", "1", episodeId, false);
    }

    return (
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <p>
                        {home
                            ?<a href= "#" onClick={e=> handleEpisode(e, id)}
                            className="card-text">Name: {name}</a>
                            :<a className="card-text">Name: {name}</a>
                        }
                        </p>
                        <p className="card-text">Date: {air_date} </p>
                        <p className="card-text">Code: {episode} </p>
                    </div>
                </div>
            </div>
            {!home &&
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Characters: </p>
                        {console.log("QUE hago aca")}
                        <ul>
                            {
                            characters.map(character => (
                                <li>
                                    <a href="#" onClick={e => handleCharacter(e, character.id)} className="card-text"> {character.name} </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default EpisodeInfo;