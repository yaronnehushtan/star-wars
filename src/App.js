import './App.scss';
import BarChart from "./BarChart/BarChart";
import HashTables from "./HashTables/HashTables";
import {useState} from "react";


function App() {
    const [isFirstPart, setIsFirstPart] = useState(true)

  return (
    <div className="App">
        <h3 className="title">{ isFirstPart ? 'Part 1' : 'Part 2'}</h3>
        <button className="parts-button" onClick={()=>{setIsFirstPart(!isFirstPart)}} >{ isFirstPart ? 'To Part 2' : 'To Part 1'}</button>
        { isFirstPart && <HashTables />}
        { !isFirstPart && <BarChart />}
    </div>
  );
}

export default App;
