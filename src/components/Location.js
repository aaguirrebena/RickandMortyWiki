import React, {useState, useEffect} from 'react';

const PlanetInfo = props => {

    const {name, type, dimension, residents} = props.location;

    const [residentData, setResidentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const promiseArray = residents.map(e => fetch(e).then(response => response.json()));
        Promise.all(promiseArray).then(result => {
            setResidentData(result);
            setLoading(false);
        });
    }, [residents]);

    function handleClick (e, resident) {

        props.searchData("character_id", "1", resident.id);
    }


    return (
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Name: {name} </p>
                        <p className="card-text">Type: {type} </p>
                        <p className="card-text">Dimension: {dimension} </p>
                    </div>
                </div>
            </div>
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Residents: </p>
                        {loading && "LOADING..."}
                        <ul>
                            {!loading &&
                                residentData.map(resident => (
                                    <li>
                                        <a href="#" onClick={e => handleClick(e, resident)}
                                        className="card-text"> {resident.name}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetInfo;
