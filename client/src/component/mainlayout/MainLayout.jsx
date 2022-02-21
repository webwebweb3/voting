import React from "react";
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, Divider, Toolbar } from "@mui/material";

// import Header from "./Header";import React from 'react';
// import { useTheme } from '@mui/material/styles';
// import { AppBar, Box, Divider, Toolbar } from '@mui/material';

// import Header from './Header';
// import Sidebar from './Sidebar/sidebar';
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const theme = useTheme();

    return (
        <Box sx={{ width: "100%", display: "inline-block" }}>
            <Box style={{}}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
