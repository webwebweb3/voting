import React from "react";
import "../AddCandidate.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const TotalCandidate = ({ totalcan }) => {
    // const [countVoters, setVoters] = useState(0);

    return (
        <Box className="addCandidate_totalCandidates_container">
            <Paper className="addCandidate_totalCandidates" elevation={3}>
                <div className="addCandidate_totalCandidates_div">
                    Total Candidaters : {totalcan}
                </div>
            </Paper>
        </Box>
    );
};

export default TotalCandidate;
