import React, {useState, useEffect} from 'react';

const EpisodeInfo = (props) => {

    const {name, air_date, episode, characters} = props.episode;

    const [charNames, setChar] = useState([]);
    const [loading, setLoading] =  useState(true);

    useEffect(() => {
        const promiseArray = characters.map(e => fetch(e).then(response => response.json()));
        Promise.all(promiseArray).then(result => {
            setChar(result);
            setLoading(false);
        });
    }, [characters]);

    function handleClick (e, character) {
        e.preventDefault();

        props.searchData("character_id", "1", character.id);
    }
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
                        <p className="card-text">Characters: </p>
                        {loading && "LOADING..."}
                        <ul>
                            {!loading &&
                            charNames.map(character => (
                                <li>
                                    <a href="#" onClick={e => handleClick(e, character)} className="card-text"> {character.name} </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EpisodeInfo;