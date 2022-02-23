import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
// import StatusCandidate from "./sections/StatusCandidate";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TotalRegisters from "./sections/TotalCandidate";
import "./AddCandidate.css";

const AddCandidate = (props) => {
    const { accounts, contract, loading, stateNumber } = props.web3Data;

    const [slogan, setSlogan] = useState("");
    const [candidateNumber, setCandidateNumber] = useState(0);
    const [name, setName] = useState("");
    const [candidateMember, setCandidateMember] = useState([]);

    const fetch = async () => {
        const candidateNumber = await contract.methods
            .getCandidateNumber()
            .call();
        setCandidateNumber(candidateNumber);
    };

    const fetchCandidate = async () => {
        let candidateArray = [];
        for (let i = 1; i <= candidateNumber; i++) {
            const candidate = await contract.methods
                .candidateDetails(i - 1)
                .call();
            candidateArray.push(candidate);
        }
        setCandidateMember(candidateArray);
    };

    useEffect(() => {
        if (Object.keys(contract).length === 0) return;
        
        try {
            fetch();
            fetchCandidate();
        } catch (error) {
            alert(`Failed.`);
            console.error(error);
        }
    }, [contract, candidateNumber]);

    const addCandidateHandler = async (e) => {
        e.preventDefault();
        await contract.methods
            .addCandidate(name, slogan)
            .send({ from: accounts, gas: 5000000 });
        setName("");
        setSlogan("");
        fetch();
    };

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onSloganChange = (e) => {
        setSlogan(e.target.value);
    };

    const fetchCancle = async (id) => {
        await contract.methods.deleteCandidate(id).send({
            from: accounts,
            gas: 1000000,
        });
    };

    const cancleRegistration = (id) => {
        try {
            fetchCancle(id);
        } catch (error) {
            console.log(error);
        }
    };

    const buttons = (
        <>
            {stateNumber !== 0 ? (
                <Button variant="outlined" disabled>
                    Disabled
                </Button>
            ) : (
                <Button
                    className="addCandidate_adding_btn"
                    type="submit"
                    color="secondary"
                    variant="contained"
                >
                    Registration
                </Button>
            )}
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
                            <div className="addCandidate_adding_name addCandidate_adding_box">
                                <div className="addCandidate_adding_subtitle">
                                    name
                                </div>
                                <TextField
                                    required
                                    label="name"
                                    variant="standard"
                                    name="name"
                                    value={name}
                                    onChange={onNameChange}
                                />
                            </div>
                            <div className="addCandidate_adding_slogan addCandidate_adding_box">
                                <div className="addCandidate_adding_subtitle">
                                    slogan
                                </div>
                                <TextField
                                    required
                                    label="slogan"
                                    variant="standard"
                                    name="slogan"
                                    sx={{ width: 800 }}
                                    onChange={onSloganChange}
                                />
                            </div>
                            <div className="addCandidate_adding_btn_container">
                                {buttons}
                            </div>
                        </div>
                    </form>

                    <Box className="addCandidate_status_box">
                        <Paper
                            className="addCandidate_status_paper"
                            elevation={3}
                        >
                            <div className="addCandidate_status_container">
                                <div className="addCandidate_status_title">
                                    <h3>Candidate registration status</h3>
                                </div>
                                {candidateMember.map((candidate, index) => {
                                    return (
                                        <div key={candidate.candidateId}>
                                            <div className="addCandidate_status_bundle">
                                                <div className="addCandidate_status_bundle_subtitle_name">
                                                    name
                                                </div>
                                                <div className="addCandidate_status_bundle_contents_name">
                                                    {candidate.name}
                                                </div>
                                                <div className="addCandidate_status_bundle_btn">
                                                {stateNumber !== 0 ? (
                                                    <></>
                                                ): (
                                                    <Button
                                                        className="addCandidate_status_cancel_btn"
                                                        onClick={() =>
                                                            cancleRegistration(
                                                                candidate.candidateId
                                                            )
                                                        }
                                                    >
                                                        cancel
                                                    </Button>
                                                )}
                                                </div>
                                                <div className="addCandidate_status_bundle_subtitle_slogan">
                                                    slogan
                                                </div>
                                                <div className="addCandidate_status_bundle_contents">
                                                    {candidate.slogan}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Paper>
                    </Box>
                </>
            )}
        </>
    );
};

export default AddCandidate;
