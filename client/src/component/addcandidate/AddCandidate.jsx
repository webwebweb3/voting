import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import StatusCandidate from "./sections/StatusCandidate";
import TotalRegisters from "./sections/TotalCandidate";

const AddCandidate = () => {
    const [name, setName] = useState("");
    const [slogan, setSlogan] = useState("");

    const textOnName = (e) => {
        setName(e.target.value);
    };

    return (
        <div>
            <h1>Add a new candidate</h1>
            <TotalRegisters totalcan={0} />

            <div className="addCandidate_adding_container">
                <div className="addCandidate_adding_name">
                    name
                    <TextField
                        required
                        label="name"
                        variant="standard"
                        name="name"
                        onChange={textOnName}
                    />
                </div>
                <div className="addCandidate_adding_slogan">
                    slogan
                    <TextField
                        required
                        label="slogan"
                        variant="standard"
                        name="slogan"
                        onChange={textOnName}
                    />
                    <Button>submit</Button>
                </div>
            </div>
            <StatusCandidate />
        </div>
    );
};

export default AddCandidate;
