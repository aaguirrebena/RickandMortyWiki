import React, {useEffect} from 'react';

const CharInfo = props => {

    const {image, name, species, status, type, gender, origin, location, episode} = props.character;

    function handle_episode (ids) {
        const use = ids.split("/");
        const len = use.length-1
        const id = use[len]

        props.searchData("episode_id", "1", `${id}`)
    }

    function handle_origin (e) {
        e.preventDefault();

        props.searchData(origin.name, "1", "")
    }

    function handle_location (e) {
        e.preventDefault();

        props.searchData(location.name, "1", "")
    }

    return (
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <img src={image} alt={name} className="card-img-top" />
                    <div className="card-body">
                        <p className="card-text">Name: {name} </p>
                        <p className="card-text">Species: {species} </p>
                        <p className="card-text">Status: {status} </p>
                        <p className="card-text">Type: {type} </p>
                        <p className="card-text">Gender: {gender} </p>
                        <p><a href= "#" onClick={handle_origin} className="card-text">Origin: {origin.name} </a></p>
                        <p><a href= "#" onClick={handle_location} className="card-text">Location: {location.name} </a></p>
                        <a href={image} target="_blank" className="btn btn-primary btn-block">Character View </a>
                    </div>
                </div>
            </div>
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Episodes: </p>
                        <ul>
                            {episode.map(e =>
                                <li><a href= "#" onClick={() => handle_episode(e)} className="card-text "> {e} </a></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharInfo;