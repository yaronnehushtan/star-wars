import React from 'react';
import './BarValue.scss'


function BarValue (props) {

    function addCommas(str) {
        let parts = (str + "").split("."),
            main = parts[0],
            len = main.length,
            output = "",
            first = main.charAt(0),
            i;

        if (first === '-') {
            main = main.slice(1);
            len = main.length;
        } else {
            first = "";
        }
        i = len - 1;
        while(i >= 0) {
            output = main.charAt(i) + output;
            if ((len - i) % 3 === 0 && i > 0) {
                output = "," + output;
            }
            --i;
        }
        output = first + output;
        if (parts.length > 1) {
            output += "." + parts[1];
        }
        return output;
    }

    return (
        <div className="BarValue">
            <p>{addCommas(props.value.toString())} {props.chartType==='logs' && <span className="logs">({Math.log10(props.value).toFixed(1)})</span>}</p>
        </div>
    );

}

export default BarValue
