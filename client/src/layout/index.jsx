import React from 'react';
import { AppBar, Box, Divider, Toolbar } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar/sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'inline-block' }}>
            {/* header */}
            <AppBar
                enableColorOnDark
                display="block"
                color="inherit"
                elevation={0}
            >
                <Toolbar style={{ padding: 0, marginTop: "-5px" }} >
                    <Header />
                    <Box  style={{ marginTop: "10px"}}>
                        <Sidebar />
                    </Box>
                </Toolbar>
                <Divider sx={{ mt: 0.25, mb: 0.25, marginTop: "-7px" }} />
            </AppBar>

            {/* main content */}
            <Box  style={{ marginLeft: "20px", marginTop: "100px"}}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
