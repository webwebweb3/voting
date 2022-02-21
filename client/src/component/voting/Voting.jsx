import React, { useEffect, useState } from "react";
import electionContract from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const Voting = () => {
    const [web3, setWeb3] = useState({});
    const [accounts, setAccounts] = useState("");
    const [contract, setContract] = useState({});
    const [candidateNumber, setCandidateNumber] = useState(0);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();

            const deployedNetwork = electionContract.networks[networkId];

            const electionInstance = new web3.eth.Contract(
                electionContract.abi,
                deployedNetwork && deployedNetwork.address
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            setWeb3(web3);
            setAccounts(accounts[0]);
            console.log(electionInstance);
            setContract(electionInstance);
            setLoading(false);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    console.log(contract);

    useEffect(() => {
        fetchData();
    }, []);

    const fetch = async () => {
        console.log(contract);

        const candidateNumber = await contract.methods
            .getCandidateNumber()
            .call();
        setCandidateNumber(candidateNumber);
    };

    const addCandidate = async (e) => {
        console.log(accounts);
        console.log(typeof accounts);
        await contract.methods
            .addCandidate(name)
            .send({ from: accounts, gas: 5000000 });
        setName("");
        fetch();
    };

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    if (!web3) {
        return (
            <>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>Loading Web3, accounts, and contract...</div>
                )}
            </>
        );
    } else {
        return (
            <>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {candidateNumber}
                        <TextField
                            required
                            name="address"
                            sx={{ width: "100", displayPrint: "block" }}
                        />
                        <Button
                            onClick={addCandidate}
                            className="transaction_submit_btn"
                        >
                            제출
                        </Button>
                        <div>
                            <div></div>
                        </div>
                    </>
                )}
            </>
        );
    }
};

export default Voting;
