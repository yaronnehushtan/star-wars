import React from 'react';
import './Spinner.scss';

function Spinner() {

    return (
        <div className="Spinner">
            <div className="App__loading">
                <h1>Loading The Data</h1>
                <div className="spinner-container">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        </div>

    );
}

export default Spinner;
