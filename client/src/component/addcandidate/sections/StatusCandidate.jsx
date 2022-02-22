import React, { useEffect, useState } from "react";

const StatusCandidate = (props) => {
    const [candiMem, setCandiMem] = useState([]);
    console.log("pp", props);
    const fetchData = () => {
        let candidateArray = [];
        for (let i = 0; i <= props.candidateMember.length; i++) {
            candidateArray.push(props.candidateMember[i]);
        }
        console.log("캔디어레이", candidateArray);
        setCandiMem(candiMem);
    };
    useEffect(() => {
        if (props.candidateMember.length == 0) return;
        try {
            fetchData();
            console.log("패치?");
        } catch (error) {
            console.log(error);
        }
    }, [props.candidateMember.length]);

    return (
        <>
            {props.candidateMember.length ? (
                <div>
                    StatusCandidateggaa
                    {candiMem.map((candidate, index) => {
                        console.log("a".candidate);
                        return (
                            <>
                                <div>
                                    <div>이름 = {candidate.name}</div>
                                </div>
                            </>
                        );
                    })}
                </div>
            ) : (
                <div>Loading Web3, accounts, and contract...</div>
            )}
        </>
    );
};

export default StatusCandidate;
