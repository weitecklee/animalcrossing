import { Dispatch, SetStateAction, useState, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import LeafIcon from '../public/Animal_Crossing_Leaf.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

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
                  bgcolor: component === page ? 'primary.main' : 'secondary.main',
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