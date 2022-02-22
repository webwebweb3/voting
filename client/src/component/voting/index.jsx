import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";

const Voting = (props) => {
    const { accounts, contract, loading } = props.web3Data;

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
        setCandidateMember(candidateArray)
    };

    const fetchVote = async (id) => {
        await contract.methods
            .vote(id)
            .send({ from: accounts, gas: 1000000 });
        fetchCandidate();
    };

    useEffect(() => {
        if (Object.keys(contract).length == 0) return;

        try {
            fetch();
            fetchCandidate();
        } catch (error) {
            alert(
                `Failed.`
            );
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
    }

    return (
        <>
            {loading ? (
                <div>Loading Web3, accounts, and contract...</div>
            ) : (
                <>
                    총 후보자 숫자 = {candidateNumber}
                    <hr />
                    <div>
                        {candidateMember.map((candidate, index) => {
                            return (
                            <>
                                <div>
                                    {parseInt(candidate.candidateId) + 1} 번
                                </div>
                                <div>
                                    이름 = {candidate.name}
                                </div>
                                <div>
                                    슬로건 = {candidate.slogan}
                                </div>
                                <div>
                                    투표수 = {candidate.voteCount}
                                </div>
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => confirmVote(index)}
                                >
                                    Vote
                                </Button>
                                <hr />
                            </>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default Voting;
