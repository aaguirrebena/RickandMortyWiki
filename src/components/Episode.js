import React, {useState, useEffect} from 'react';

const EpisodeInfo = (props) => {

    const {name, air_date, episode, characters} = props.episode;

    function handle_click (ids) {
        const use = ids.split("/");
        const len = use.length-1
        const id = use[len]
        props.searchData("character_id", "1", `${id}`);
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
                        <ul>
                            {characters.map(c =>
                                <li><a href="#" onClick={() => handle_click(c)} className="card-text "> {c} </a></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EpisodeInfo;