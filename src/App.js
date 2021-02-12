import React, { useEffect, useState } from "react";

import LineChart from "./components/charts/LineChart";
import Dropdown from "./components/Dropdown";
import { getPortsList, getRate } from "./api/comparison";

import "./App.css";

function App() {
  const [ports, setPorts] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function fetchPorts() {
      const ports = await getPortsList();
      if (mounted) {
        setPorts(ports);
        setOrigin(ports[0].code);
        setDestination(ports[1].code);
      }
    }

    fetchPorts();
    return () => (mounted = false);
  }, []);

  const handleOriginChange = (e) => {
    setOrigin(e.target.value);
    fetchChartData();
  };

  const handledestinationChange = (e) => {
    setDestination(e.target.value);
    fetchChartData();
  };

  const fetchChartData = async () => {
    const chartData = await getRate(origin, destination);
    setChartData(chartData);
  };

  return (
    <div className="App">
      <div className="ports-wrapper">
        {ports.length > 0 && (
          <Dropdown
            selected={origin}
            onChange={handleOriginChange}
            ports={ports}
          />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrows-left-right"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="21" y1="17" x2="3" y2="17" />
          <path d="M6 10l-3 -3l3 -3" />
          <line x1="3" y1="7" x2="21" y2="7" />
          <path d="M18 20l3 -3l-3 -3" />
        </svg>
        {ports.length > 0 && (
          <Dropdown
            selected={destination}
            onChange={handledestinationChange}
            ports={ports}
          />
        )}
      </div>
      {chartData.length > 0 && (
        <LineChart apiData={chartData} width={400} height={300} />
      )}
    </div>
  );
}

export default App;
