import React, {useState, useEffect} from 'react';

const EpisodeInfo = (props) => {

    const [charArray, setCharArray] = useState([]);
    const {name, air_date, episode, characters} = props.episode;

    // const per = async () => {
    //     let dataArray = characters.map(c =>  fetch(c))
    //     await Promise.all([dataArray])

    //     dataArray = dataArray.map(data => {
    //         const result = data.json();
    //         return ({id: result.id, name: result.name})
    //     })}

    // const usar = per();
    // async function getCharAsync(url)
    // {
    //   let response = await fetch(url);
    //   let result = await response.json()
    //   return result;
    // }
    // const charNames = characters.forEach(char => {
    //     getCharAsync(char)
    //     .then(result => ({id: result.id, name: result.name}))});

    // const charNames =   characters.forEach((c) =>  fetch(c)
    //                         .then(response => response.json())
    //                         .then(result => ({id: result.id, name: result.name, url: c})));

    function handle_click (ids) {

        props.searchData("character_id", "1", `${ids}`);
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
                        {/* {console.log(characters)} */}
                        {/* {console.log(charNames[0])} */}
                        {/* {console.log(charNames)} */}
                        {/* {console.log(usar)} */}
                        <p className="card-text">Characters: </p>
                        <ul>
                            {characters.map(c =>
                                <li><a href="#" onClick={() => handle_click(c.substr(-2))} className="card-text "> {c} </a></li>
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