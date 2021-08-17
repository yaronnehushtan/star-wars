import React from 'react';
import './BarContainer.scss'
import BarColumn from "../BarColumn/BarColumn";
import BarLabel from "../BarLabel/BarLabel";
import BarValue from "../BarValue/BarValue";
import ReactTooltip from "react-tooltip";


function BarContainer (props) {

    const containerWidth = {
        width: 100/props.culomnsAmount+'%'
    };

    return (
        <div className="BarContainer" style={containerWidth} data-tip={props.name + ':' + props.value/1000000 + 'M'}>
                <BarValue value={props.value} chartType={props.chartType}/>
                <BarColumn relativeHeight={props.relativeHeight}/>
                <BarLabel name={props.name}/>
            <ReactTooltip />
        </div>

    );
}

export default BarContainer
