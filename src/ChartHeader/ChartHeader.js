import React, { useState} from 'react';
import './ChartHeader.scss'


function ChartHeader (props) {

    const [type, setType] = useState(props.chartType)

    function toggleChartType(){
        if (props.chartType==='values'){
            setType('logs')
            props.toggleChartType('logs')
        } else {
            setType('values')
            props.toggleChartType('values')
        }
    }

    return (
        <div className="ChartHeader">
            <div >
                <h3>Star Wars</h3>
                <h4>Plants Population ({type})</h4>
            </div>
            <div className="header-controls">
                <button className="btn" onClick={toggleChartType}>{type==='values' ? 'To Logs' : 'To Values'}</button>
            </div>
        </div>
    );
}


export default ChartHeader

