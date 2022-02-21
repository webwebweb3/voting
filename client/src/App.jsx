import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import MainLayout from "./layout";
import Home from "./component/Home";
import AddCandidate from "./component/AddCandidate";
import Voting from "./component/Voting";
import Results from "./component/Results";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="addCandidate" element={<AddCandidate />} />
          <Route path="voting" element={<Voting />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
