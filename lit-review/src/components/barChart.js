import React from "react";
import { VegaLite } from "react-vega";
import classPapers from '../data.json';

const getData = () => {
    let venueDict = {}
    for(let i = 0; i < classPapers.length; i++) {
      let paper = classPapers[i];
      if(paper['s2data'] && paper['s2data']['venue']) {
        let venue = paper['s2data']['venue'];
        venueDict[venue] = venueDict[venue] ? venueDict[venue] + 1 : 1;
      }
    }
    return venueDict;
}

const transformData = (data) => {
    // loop through a map in javascript
    let transformedData = [];
    for (let key in data) {
        transformedData.push({venue: key, count: data[key]});
    }
    return {table: transformedData};
}

const spec = {
    width: 500,
    height: 200,
    title: "The publication venue relevant to the Future of Scholarly Communication.",
    // mark: 'bar',
    encoding: {
      x: { field: 'venue', type: 'nominal', sort: '-y', axis: {labelAngle: -45, labelLimit: 60, labelFontSize: 8} },
      y: { field: 'count', type: 'quantitative' },
      fillOpacity: {
        condition: {selection: "select", value: 1},
        value: 0.4
      },
      strokeWidth: {
        condition: [
          {
            test: {
              and: [
                {selection: "select"},
                "length(data(\"select_store\"))"
              ]
            },
            value: 2
          },
          {selection: "highlight", value: 1}
        ],
        "value": 0
      }
    },
    selection: {
        highlight: {type: "single", empty: "none", on: "mouseover"},
        select: {type: "multi"}
      },
      mark: {
        tooltip: true,
        type: "bar",
        fill: "#4C78A8",
        stroke: "black",
        cursor: "pointer"
      },
    data: { name: 'table' }, 
}

const vegadata = () => {
    return transformData(getData());
}

function BarChart() {
    // let data = transformData(getData());
    return (
        <VegaLite spec={spec} data={ vegadata() } />
    );
}

export default BarChart;
