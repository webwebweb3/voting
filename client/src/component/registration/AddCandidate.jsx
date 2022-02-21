import React from "react";
import Adding from "./sections/Adding";
import TotalRegisters from "./sections/TotalCandidate";

const AddCandidate = () => {
    return (
        <div>
            <h1>Add a new candidate</h1>
            <TotalRegisters totalcan={1} />
            <Adding />
        </div>
    );
};

export default AddCandidate;
