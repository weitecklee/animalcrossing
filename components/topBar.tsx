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

const pages = ['Villagers', 'Timeline'];

export default function TopBar({setComponent}: { setComponent: Dispatch<SetStateAction<string>> }) {

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
            <IconButton onClick={handleClick}>
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
              >
                {page}
              </MenuItem>)}
            </Menu>
          </Box>
          <Button
            onClick={() => setComponent('Index')}
          >
            <Image
              src={LeafIcon}
              alt="Animal Crossing Leaf"
              height={36}
            />
          </Button>
          <Typography variant="h5" fontWeight="500" sx={{flexGrow: 1}}>
            My Animal Crossing Island
          </Typography>
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color:'black',
                  mx: 1,
                  ':hover': {
                    bgcolor: "success.main",
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