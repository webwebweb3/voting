import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./component/Home";
import MainLayout from "./component/mainlayout/MainLayout";
import AddCandidate from "./component/registration/AddCandidate";
import Voting from "./component/voting/Voting";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="voting" element={<Voting />} />
                    <Route path="addcandidate" element={<AddCandidate />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
