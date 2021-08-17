import React from 'react';
import './BarColumn.scss'


function BarColumn (props) {

    const columnStyle = {
        height: props.relativeHeight+'%'
    };

    return (
        <div className="BarColumn" style={columnStyle}>
        </div>
    );

}

export default BarColumn
