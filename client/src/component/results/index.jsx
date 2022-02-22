import React, { useEffect, useState } from "react";

const Results = (props) => {
  const { accounts, contract, loading, stateNumber } = props.web3Data;
    
    useEffect(() => {
    }, [])
    
  return (
    <h1>Results</h1>
  );
};

export default Results;