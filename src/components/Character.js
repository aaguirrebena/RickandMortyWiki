import React from 'react';

const CharInfo = props => {

    const {url, image, name, species, status, type, gender, origin, location, episode} = props.character;
    // console.log(origin)
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
                        <p><a href={origin.url} className="card-text">Origin: {origin.name} </a></p>
                        <p><a href={location.url} className="card-text">Location: {location.name} </a></p>
                        <a href={image} target="_blank" className="btn btn-primary btn-block">Character View </a>
                    </div>
                </div>
            </div>
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        {/* {console.log(listItems)} */}
                        <p className="card-text">Episodes: </p>
                        <ul>
                            {episode.map(e =>
                                <li><a href={e} className="card-text"> {e} </a></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharInfo;