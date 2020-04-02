import React from 'react';

const Pages = props => {
    return(
        <div className="py-3">
            <button onClick={props.previewPage} type="button" className="btn btn-info mr-1">preview &larr;</button>
            <button onClick={props.nextPage} type="button" className="btn btn-info mr-1">next &rarr;</button>
        </div>
    )
}

export default Pages;
