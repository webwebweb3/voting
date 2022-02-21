import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Adding = () => {
    const [name, setName] = useState("");
    const textOnName = (e) => {
        setName(e.target.value);
    };
    return (
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
    );
};

export default Adding;
