import React, {useEffect, useState} from 'react';
import './BarChart.scss'
import BarContainer from "../BarContainer/BarContainer";
import ChartHeader from "../ChartHeader/ChartHeader";




function BarChart () {

    const [maxValue, setMaxValue] = useState({});
    const [planetsData, setPlanetsData] = useState([]);
    const [chartType, setChartType] = useState('values');


    useEffect( ()=>{
        const plantsNamesList = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'];
        async function getPlants() {
            try {
                const res = await fetch('https://swapi.dev/api/planets');
                if (res.status !== 200) {
                    return null;
                }
                const fetchedPlantsData = await res.json();
                const planetsData = [];
                plantsNamesList.forEach(plantName => {
                    const PlantPopulation = fetchedPlantsData.results.find(fetchedPlant => fetchedPlant.name === plantName).population;
                    planetsData.push({name: plantName, population: PlantPopulation, populationLog10: Math.log10(PlantPopulation)})
                });
                setPlanetsData(planetsData)
                const maxValue = {
                    values: Math.max.apply(Math, planetsData.map((o) => {return o.population})),
                    logs: Math.max.apply(Math, planetsData.map((o) => {return o.populationLog10})),
                    minLog: Math.min.apply(Math, planetsData.map((o) => {return o.populationLog10}))
                }
                setMaxValue(maxValue)
            } catch (e){
                return null;
            }
        }

        getPlants();
    },[])

    function getRelativeHeight(value){
        if (maxValue){
            const calculatedHeight = chartType==='logs' ? (value-(maxValue.minLog/1.15))/(maxValue[chartType]-(maxValue.minLog/1.15))*80 : value/maxValue[chartType]*80
            return calculatedHeight;
        }
    }

    function fromHeader(newType){
        setChartType(newType)
    }

    return (
        <div className="BarChart">
            <ChartHeader toggleChartType={fromHeader} chartType={chartType}/>
            <div className="chart-container">
                {planetsData.map( (planet, index) => {
                    return <BarContainer
                        key={planet.name+Math.random()}
                        name={planet.name}
                        value={planet.population}
                        relativeHeight={getRelativeHeight(chartType==='values' ? planet.population : planet.populationLog10)}
                        culomnsAmount={planetsData.length}
                        chartType={chartType}/>
                })}
            </div>
        </div>
    );
}


export default BarChart

