import React from "react";

const DataTime = () => {
  let fecha = new Date();
  let displayFecha =
    fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
  return displayFecha;
};

export default DataTime;
