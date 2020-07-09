import React from 'react';

const PlanetInfo = props => {

    const {id, name, type, dimension, residents} = props.location;
    const home = props.home;

    function handleCharacter (e, residentId) {

        props.searchData("character_id", "1", residentId);
    }

    function handleLocation (e, locationId) {
        e.preventDefault();

        props.searchData("location_id", "1", locationId);
    }

    return (
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <p>
                        {home
                            ?<a href="#" onClick={e => handleLocation(e, id)} className="card-text">Name: {name}</a>
                            :<a className="card-text">Name: {name}</a>
                        }
                        </p>
                        <p className="card-text">Type: {type} </p>
                        <p className="card-text">Dimension: {dimension} </p>
                    </div>
                </div>
            </div>
            {!home &&
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Residents: </p>
                        <ul>
                            {
                            residents.map(resident => (
                                <li>
                                    <a href="#" onClick={e => handleCharacter(e, resident.id)}
                                    className="card-text"> {resident.name}</a>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default PlanetInfo;
