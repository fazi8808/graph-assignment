import React from "react";

function dropdown(props) {
  const { onChange, ports, origin } = props;
  return (
    <select selected={origin} onChange={onChange}>
      {ports.map((port) => (
        <option value={port.code}>{`${port.name} (${port.code})`}</option>
      ))}
    </select>
  );
}

export default dropdown;
