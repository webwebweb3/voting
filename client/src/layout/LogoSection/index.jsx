import React from 'react';
import { Link } from 'react-router-dom';

import { Box, ButtonBase, ListItemText, Typography } from '@mui/material';

/* Logo - Img, Name */

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={"/"}>
        <Box
            component="img"
            sx={{
                height: "1em",
                width: "1em",
            }}
            alt="WebWebWeb"
            src="logo.jpg"
        />
        <ListItemText
            sx={{
                pl: `4px`,
            }}
            primary={
                <Typography 
                    variant='h5'
                    color="inherit"
                    fontSize="0.8em"
                >
                    WebWebWeb
                </Typography>
            }
        />
    </ButtonBase>
);

export default LogoSection;
