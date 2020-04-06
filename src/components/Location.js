import React from 'react';

const PlanetInfo = props => {

    const {name, type, dimension, residents} = props.location;

    // async function getCharAsync(url)
    // {
    //   let response = await fetch(url);
    //   let result = await response.json()
    //   return result;
    // }
    // const res_name = residents.forEach(char => {
    //     getCharAsync(char)
    //     .then(result => ({id: result.id, name: result.name}))});

    function handle_click (ids) {

        props.searchData("character_id", "1", `${ids}`);
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
                        {/* {console.log(listItems)} */}
                        <p className="card-text">Residents: </p>
                        <ul>
                        {residents.map(r =>
                                <li><a href= "#" onClick={() => handle_click(r.substr(-2))} className="card-text "> {r}  </a></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanetInfo;
