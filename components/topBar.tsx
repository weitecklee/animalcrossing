import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function TopBar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack direction="row" spacing={1}>
            <Typography variant="body1" fontWeight="700">
              My Animal Crossing Island
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}