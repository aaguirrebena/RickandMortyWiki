import React, {useState, useEffect} from 'react';

const EpisodeInfo = (props) => {

    // const [charArray, setCharArray] = useState([]);
    const {name, air_date, episode, characters} = props.episode;

    // useEffect(async () => {
    //     const dataArray = characters.map(c =>  fetch(c)
    //     .then(response => response.json())
    //     .then(result => ({id: result.id, name: result.name})))
    //     await Promise.all([dataArray])
    //     setCharArray(dataArray)
    // }, [])



        // dataArray = dataArray.map(data => {
        //     const result = data.json();
        //     return ({id: result.id, name: result.name})
        // })}

    // async function getCharAsync(url)
    // {
    //   let response = await fetch(url);
    //   let result = await response.json()
    //   return result;
    // }
    // const charNames = characters.map(char => {
    //     getCharAsync(char)
    //     .then(result => ({id: result.id, name: result.name}))});

    // const charNames = []

    // characters.forEach((c) => fetch(c)
    //                     .then(response => response.json())
    //                     .then(result => charNames.push({id: result.id, name: result.name})));

    // Promise.all([charNames])
    //     .then(results => {
    //      console.log(results);
    //  })


    function handle_click (ids) {
        const use = ids.split("/");
        const len = use.length-1
        const id = use[len]
        // console.log(use, len, id)
        props.searchData("character_id", "1", `${id}`);
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
                        {/* {console.log(charNames)} */}
                        <p className="card-text">Characters: </p>
                        <ul>
                            {characters.map(c =>
                                <li><a href="#" onClick={() => handle_click(c)} className="card-text "> {c} </a></li>
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