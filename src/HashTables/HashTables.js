import React, {useEffect, useState} from 'react';
import './HashTables.scss'
import Spinner from "../Spinner/Spinner";
import ResultsTable from "../ResultsTable/ResultsTable";


function HashTables () {

    const [finalResult, setFinalResult] = useState()
    const [isLoading, setLoading] = useState(true);

    class HashTable {

        table = new Array(33)
        numItems = 0;

        hashStringToInit = (s, tableSize)=>{
            let hash = 0;
            for (let i=0 ; i < s.length; i++){
                hash += s.charCodeAt(i)
            }
            return hash % tableSize
        }

        resize = () => {
            const newTable = new Array(this.table.length * 2);
            this.table.forEach(item => {
                if (item) {
                    item.forEach(([key, value]) => {
                        const idx = this.hashStringToInit(key, newTable.length);
                        if (newTable[idx]) {
                            newTable[idx].push([key, value]);
                        } else {
                            newTable[idx] = [[key, value]];
                        }
                    });
                }
            });
            this.table = newTable;
        };

        setItem = (key,value) => {
            this.numItems ++;
            const loadFactor = this.numItems / this.table.length
            if (loadFactor > 0.8){
                this.resize()
            }
            const idx = this.hashStringToInit(key, this.table.length);
            if (this.table[idx]){
                this.table[idx].push([key,value])
            } else {
                this.table[idx] = [[key,value]];
            }
        }

        getItem = (key) =>{
            const idx = this.hashStringToInit(key, this.table.length);
            if (!this.table[idx]){
                return null
            }
            return this.table[idx].find(x => x[0] === key)[1];
        }
    }

    const getDataArray = async (url, data)=> {
        try {
            const res = await fetch(url);
            if (res.status !== 200) {
                return null;
            }
            const fetchedData = await res.json();
            data.push(...fetchedData.results)
            if (fetchedData.next){
                return getDataArray(fetchedData.next, data)
            } else {
                return convertDataToHashTable({data: data, url: url.split('/')[url.split('/').length-2]})
            }
        } catch (e){
            return null;
        }
    }

    const convertDataToHashTable = (dataFromServer)=>{
            const data = dataFromServer.data
            const type = dataFromServer.url
            const table = new HashTable();
            data.forEach((entity)=>{
                if (type === 'people'){
                    if (entity.vehicles.length > 0){
                        const peopleObj = {
                            name: entity.name,
                            url: entity.url,
                            homeworld: entity.homeworld,
                            vehicles: [...entity.vehicles]
                        }
                        table.setItem( entity.url, peopleObj)
                    }
                }
                if (type === 'vehicles'){
                    if (entity.pilots.length > 0){
                        const vehicleObj = {
                            name: entity.name,
                            url: entity.url,
                            pilots: [...entity.pilots]
                        }
                        table.setItem( entity.url, vehicleObj)
                    }
                }
                if (type === 'planets'){
                    const planetObj = {
                        name: entity.name,
                        url: entity.url,
                        population: entity.population,
                    }
                    table.setItem( entity.url, planetObj)
                }
            });
            return table
        }

    const getHashTables = async ()=> {
        const url = 'https://swapi.dev/api/';
        const people = getDataArray(url + 'people', [])
        const vehicles = getDataArray(url + 'vehicles', [])
        const planets = getDataArray(url + 'planets', [])

        const hashTablesObj = await Promise.all([people, vehicles, planets])
        return hashTablesObj
    }

    useEffect( ()=>{
        getHashTables().then((results)=>{
            const [people, vehicles, planets] = results
            let result = {vehicle: {}, totalPopulation: 0}

            vehicles.table.forEach((vehicle, i) =>{
                for(let i=0; i<vehicle.length; i++ ){
                    const vehicleAndPopulation = {
                        name: '',
                        pilots: [],
                        totalPopulation: 0
                    }
                    const vehicleData =  vehicle[i][1]
                    vehicleAndPopulation.name = vehicleData.name
                    vehicleAndPopulation.url = vehicleData.url
                    vehicleData.pilots.forEach(pilotUrl=>{
                        const peopleData = people.getItem(pilotUrl)
                        const planetsData = planets.getItem(peopleData.homeworld)
                        const pilot = {
                            name: peopleData.name,
                            homeworld: {name: planetsData.name, population: planetsData.population!=='unknown' ? parseInt(planetsData.population) : 0}
                        }
                        vehicleAndPopulation.pilots.push(pilot)
                        vehicleAndPopulation.totalPopulation += pilot.homeworld.population
                    })
                    if (vehicleAndPopulation.totalPopulation > result.totalPopulation){
                        result = {vehicle: vehicleAndPopulation, totalPopulation: vehicleAndPopulation.totalPopulation}
                    }
                }
            })
            console.log('And the winner is! :', result.vehicle)
            setFinalResult(result.vehicle)
            setLoading(false);
        })
    },[])


    return (
        <div className="HashTables">
            {isLoading ? <Spinner /> : <ResultsTable results={finalResult} />}
        </div>
    );
}


export default HashTables
