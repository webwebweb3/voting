import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import TotalRegisters from "../addcandidate/sections/TotalCandidate";
import { display } from "@mui/system";

const Voting = (props) => {
    const { accounts, contract, loading, stateNumber } = props.web3Data;

    const [candidateNumber, setCandidateNumber] = useState(0);
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

    const fetchVote = async (id) => {
        await contract.methods.vote(id).send({ from: accounts, gas: 1000000 });
        fetchCandidate();
    };

    useEffect(() => {
        if (Object.keys(contract).length == 0) return;

        try {
            fetch();
            fetchCandidate();
            console.log(contract);
        } catch (error) {
            alert(`Failed.`);
            console.error(error);
        }
    }, [contract, candidateNumber]);

    const confirmVote = (id) => {
        // 진짜 선택할건지 문구?
        try {
            fetchVote(id);
            fetchCandidate();
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    return (
        <>
            {loading ? (
                <div>Loading Web3, accounts, and contract...</div>
            ) : (
                <>
                    <h1>candidate</h1>
                    <TotalRegisters totalcan={candidateNumber} />
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            marginTop: "50px",
                        }}
                    >
                        {candidateMember.map((candidate, index) => {
                            return (
                                <div style={{ display: "inline-block" }} key={candidate.candidateId}>
                                    <Card
                                        sx={{
                                            maxWidth: "300px",
                                            marginLeft: "20px",
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={`https://avatars.dicebear.com/api/pixel-art/${candidate.candidateId}.svg`}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="div"
                                                >
                                                    기호{" "}
                                                    {parseInt(
                                                        candidate.candidateId
                                                    ) + 1}{" "}
                                                    번 {candidate.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {candidate.slogan}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    득표 : {candidate.voteCount}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            {stateNumber != 1 ? (
                                                <Button
                                                    variant="outlined"
                                                    style={{ width: "100%" }}
                                                    disabled
                                                >
                                                    Disabled
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    color="secondary"
                                                    variant="outlined"
                                                    style={{ width: "100%" }}
                                                    onClick={() =>
                                                        confirmVote(index)
                                                    }
                                                >
                                                    Vote
                                                </Button>
                                            )}
                                        </CardActions>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default Voting;
