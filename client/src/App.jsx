import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MainLayout from "./layout";
import Home from "./component/Home";
import AddCandidate from "./component/addcandidate/AddCandidate";
import Voting from "./component/Voting";
import Results from "./component/Results";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="addcandidate" element={<AddCandidate />} />
                    <Route path="voting" element={<Voting />} />
                    <Route path="results" element={<Results />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
