import React from 'react';
import './BarLabel.scss'


function BarLabel (props) {

    return (
        <div className="BarLabel">
            <p>{props.name}</p>
        </div>
    );
}

export default BarLabel
