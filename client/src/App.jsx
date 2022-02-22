import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import electionContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import MainLayout from "./layout";
import Home from "./component/Home";
import AddCandidate from "./component/addcandidate/AddCandidate";
import Voting from "./component/voting";
import Results from "./component/Results";

const App = () => {
    const [web3, setWeb3] = useState({});
    const [accounts, setAccounts] = useState("");
    const [contract, setContract] = useState({});
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

    useEffect(() => {
        fetchData();
    }, []);

    const web3Data = {
        web3,
        accounts,
        contract,
        loading,
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="addcandidate" element={<AddCandidate web3Data={web3Data}/>} />
                    <Route path="voting" element={<Voting web3Data={web3Data}/>} />
                    <Route path="results" element={<Results web3Data={web3Data}/>} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

const NotFound = () => {
    return (
        <>
            <h1>404 NOT FOUND!</h1>
            <center>The page your are looking for doesn't exists.</center>
        </>
    );
}

export default App;
