import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./result.css";

const Results = (props) => {
    const { accounts, contract, loading, stateNumber } = props.web3Data;
    const [winner, setWinner] = useState({});

    const fetchWinner = async () => {
        const candidate = await contract.methods.winner().call();
        console.log("캔디", candidate);
        setWinner(candidate);
    };

    useEffect(async () => {
        if (Object.keys(contract).length == 0) return;

        try {
            fetchWinner();
            console.log(winner);
        } catch (error) {
            alert(`Failed.`);
            console.error(error);
        }
    }, [contract]);

    if (winner.name == "") {
        return <h1>Voting...</h1>;
    } else {
        return (
            <>
                <h1>당선을 축하합니다!</h1>
                <div
                    style={{ display: "inline-block" }}
                    key={winner.candidateId}
                    className="result_container"
                >
                    <Card
                        sx={
                            {
                                // maxWidth: "300px",
                                // marginLeft: "20px",
                            }
                        }
                        className="result_card"
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://avatars.dicebear.com/api/pixel-art/${winner.candidateId}.svg`}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    기호 {parseInt(winner.candidateId) + 1} 번{" "}
                                    {winner.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {winner.slogan}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    득표 : {winner.voteCount}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </>
        );
    }
};

export default Results;
