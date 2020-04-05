import React from 'react';

const EpisodeInfo = (props) => {

    const {name, air_date, episode, characters} = props.episode;
    const charNames = []
    characters.map((c) =>  fetch(c)
                            .then(response => response.json())
                            .then(result => charNames.push({id: result.id, name: result.name, url: c})))


    function handle_click (e) {
        e.preventDefault();

        props.searchData("rick", "1");
    }
    // const listItems = charNames.map((a) =>  <li>{a}</li>);
    return (
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Name: {name} </p>
                        <p className="card-text">Date: {air_date} </p>
                        <p className="card-text">Code: {episode} </p>
                    </div>
                </div>
            </div>
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        {/* {console.log(characters)}
                        {console.log(charNames)}
                        {console.log(charNames[0])} */}
                        <p className="card-text">Characters: </p>
                        <ul>
                            {characters.map((c) =>
                                <li><a onClick={handle_click} className="card-text"> {c} </a></li>
                            )}
                            {/* <li><a onClick={handle_click}>
                                Click me! </a></li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EpisodeInfo;