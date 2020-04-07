import React, {useEffect, useState} from 'react';

const CharInfo = props => {

    const {image, name, species, status, type, gender, origin, location, episode} = props.character;

    const [episodesData, setEpisodesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const promiseArray = episode.map(e => fetch(e).then(response => response.json()));
        Promise.all(promiseArray).then(result => {
            setEpisodesData(result);
            setLoading(false);
        });
    }, [episode]);

    function handle_episode (e, episode) {
        e.preventDefault();
        props.searchData("episode_id", "1", episode.id);
    }

    function handle_origin (e) {
        e.preventDefault();

        props.searchData(origin.name, "1", "");
    }

    function handle_location (e) {
        e.preventDefault();

        props.searchData(location.name, "1", "");
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
                        <p><a href= "#" onClick={handle_origin} className="card-text">Origin: {origin.name}</a></p>
                        <p><a href= "#" onClick={handle_location} className="card-text">Location: {location.name} </a></p>
                        <a href={image} target="_blank" className="btn btn-primary btn-block">Character View</a>
                    </div>
                </div>
            </div>
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Episodes: </p>
                        {loading && "LOADING..."}
                        <ul>
                            {!loading &&
                            episodesData.map(episode => (
                                <li>
                                    <a href="#" onClick={e => handle_episode(e, episode)} className="card-text"> {episode.name} </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharInfo;