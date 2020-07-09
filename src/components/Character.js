import React from 'react';

const CharInfo = props => {

    const {id, image, name, species, status, type, gender, origin, location, episode} = props.character;
    const home = props.home

    function handleEpisode (e, episodeId) {
        e.preventDefault();
        props.searchData("episode_id", "1", episodeId);
    }

    function handleOrigin (e, originId) {
        e.preventDefault();

        props.searchData("location_id", "1", originId);
    }

    function handleLocation (e, locationId) {
        e.preventDefault();

        props.searchData("location_id", "1", locationId);
    }

    function handleCharacter (e, characterId) {

        props.searchData("character_id", "1", characterId);
    }

    return (
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <img src={image} alt={name} className="card-img-top" />
                    {home &&
                        <div className="card-body">
                        <p> <a href= "#" onClick={e=> handleCharacter(e, id)} className="card-text">Name:      {name} </a></p>
                        </div>
                    }
                    {!home &&
                    <div className="card-body">
                        <p className="card-text">Name: {name} </p>
                        <p className="card-text">Species: {species} </p>
                        <p className="card-text">Status: {status} </p>
                        <p className="card-text">Type: {type} </p>
                        <p className="card-text">Gender: {gender} </p>
                        <p>
                        {origin.name !== "unknown"
                            ?<a href= "#" onClick={e=> handleOrigin(e, origin.id)} className="card-text">Origin: {origin.name}</a>
                            :<a className="card-text">Origin: {origin.name}</a>
                        }
                        </p>
                        <p>{location.name !== "unknown"
                            ?<a href= "#" onClick={e=> handleLocation(e, location.id)} className="card-text">Location: {location.name} </a>
                            :<a className="card-text">Location: {location.name} </a>
                        }
                        </p>
                        <a href={image} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">Character View</a>
                    </div>
                    }
                </div>
            </div>
            {!home &&
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Episodes: </p>
                        <ul>
                            {
                            episode.map(ep => (
                                <li>
                                    <a href="#" onClick={e => handleEpisode(e, ep.id)} className="card-text"> {ep.name} </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default CharInfo;