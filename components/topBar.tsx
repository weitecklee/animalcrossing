'use client'

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function TopBar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar variant="square" src="/Animal_Crossing_Leaf.svg" />
            <Typography variant="h5" fontWeight="500">
              My Animal Crossing Island
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}