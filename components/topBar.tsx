import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import LeafIcon from '../public/Animal_Crossing_Leaf.svg';

const pages = ['Villagers', 'Timeline', 'Stats'];

export default function TopBar({component, setComponent}: { component: string, setComponent: Dispatch<SetStateAction<string>> }) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="secondary">
        <Toolbar>
          <Box sx={{display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              onClick={handleClick}
              sx={{
                ':hover': {
                  bgcolor: "white",
                }
              }}>
              <MenuIcon/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {pages.map((page) => <MenuItem
                key={page}
                onClick={() => {
                  setComponent(page);
                  handleClose();
                }}
                sx={{
                  bgcolor: component === page ? 'primary.main' : 'white',
                  ':hover': {
                    bgcolor: "secondary.main",
                  }
                }}
              >
                {page}
              </MenuItem>)}
            </Menu>
          </Box>
          <IconButton
            onClick={() => setComponent('Index')}
            sx={{
              mr: 1,
              ':hover': {
                bgcolor: "white"
              }
            }}
          >
            <Image
              src={LeafIcon}
              alt="Animal Crossing Leaf"
              height={36}
            />
          </IconButton>
          <Typography variant="h5" fontWeight="500" sx={{flexGrow: 1}}>
            My Animal Crossing Island
          </Typography>
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: 'black',
                  border: "2px solid",
                  borderColor: component === page ? 'primary.main' : 'secondary.main',
                  ml: 1,
                  ':hover': {
                    bgcolor: "white",
                  }
                }}
                onClick={() => setComponent(page)}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}