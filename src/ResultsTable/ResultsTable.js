import React from 'react';
import './ResultsTable.scss'


function ResultsTable (props) {

    return (
        <div className="ResultsTable">
            <div className="HashTables">
                <table className="table-fill">
                    <tbody className="table-hover">
                    <tr>
                        <td className="text-left">Vehicle name with the largest sum</td>
                        <td className="text-left">{props.results.name}</td>
                    </tr>
                    <tr>
                        <td className="text-left">
                            Related home planets and their respective population
                        </td>
                        <td className="text-left">
                            {props.results.pilots.map( pilot => {
                                return <span className="span-distance" key={pilot.homeworld.name}>
                                {pilot.homeworld.name} : {pilot.homeworld.population}
                            </span>})}
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Related pilot names</td>
                        <td className="text-left">
                            {props.results.pilots.map(pilot => {
                                return <span className="span-distance" key={pilot.name}>
                                {pilot.name}
                            </span>})}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

}


export default ResultsTable

