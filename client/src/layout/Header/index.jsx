import React from 'react';
import { Box } from '@mui/material';

import LogoSection from '../LogoSection';

const Header = () => {
  return (
    <>
      <Box
        style={{
            width: 128,
            paddingTop: "1px",
            paddingLeft: "28px",
        }}
      >
        <Box component="span">
          <LogoSection />
        </Box>
      </Box>
    </>
  );
};

export default Header;
