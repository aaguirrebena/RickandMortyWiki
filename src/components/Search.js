import React, { Component } from 'react';

class Wiki extends Component {

    searchRef = React.createRef();

    handle = (e) => {
        e.preventDefault();

        //Get the input value
        const filter = this.searchRef.current.value;
        const page = 1;
        //send to the principal Component, reset the page number
        this.props.searchData(filter, page);
    }

    render() {
        return (
            <form onSubmit={this.handle}>
                <div className="row">

                    <div className="form-group col-md-8">
                        <input ref={this.searchRef} type="text" className="form-control
                        form-control-lg" placeholder="Search Something... ex: E01S01" />
                    </div>

                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block"
                        value="submit"/>

                    </div>
                </div>

            </form>
        );
    }
}
export default Wiki;
