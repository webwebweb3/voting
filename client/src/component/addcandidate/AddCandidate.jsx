import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import StatusCandidate from "./sections/StatusCandidate";
import TotalRegisters from "./sections/TotalCandidate";

const AddCandidate = (props) => {
    const { accounts, contract, loading } = props.web3Data;

    const [slogan, setSlogan] = useState("");
    const [candidateNumber, setCandidateNumber] = useState(0);
    const [name, setName] = useState("");

    const fetch = async () => {
        const candidateNumber = await contract.methods
            .getCandidateNumber()
            .call();
        setCandidateNumber(candidateNumber);
    };

    useEffect(() => {
        if (Object.keys(contract).length == 0) return;

        try {
            fetch();
        } catch (error) {
            alert(
                `Failed.`
            );
            console.error(error);
        }
    }, [contract]);

    const addCandidateHandler = async (e) => {
        console.log(contract)
        e.preventDefault();
        await contract.methods
            .addCandidate(name, slogan)
            .send({ from: accounts, gas: 5000000 });
        setName("");
        fetch();
    };

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onSloganChange = (e) => {
        setSlogan(e.target.value);
    };

    const buttons = (
        <>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
          >
           submit
          </Button>
        </>
      );

    return (
        <>
            {loading ? (
                <div>Loading Web3, accounts, and contract...</div>
            ) : (
                <>
                    <h1>Add a new candidate</h1>
                    <TotalRegisters totalcan={candidateNumber} />

                    <form onSubmit={addCandidateHandler}>
                        <div className="addCandidate_adding_container">
                            <div className="addCandidate_adding_name">
                                name
                                <TextField
                                    required
                                    label="name"
                                    variant="standard"
                                    name="name"
                                    value={name}
                                    onChange={onNameChange}
                                />
                            </div>
                            <div className="addCandidate_adding_slogan">
                                slogan
                                <TextField
                                    required
                                    label="slogan"
                                    variant="standard"
                                    name="slogan"
                                    onChange={onSloganChange}
                                />
                            </div>
                            {buttons}
                        </div>
                    </form>
                    <StatusCandidate />
                </>
            )}
        </>
    );
};

export default AddCandidate;
