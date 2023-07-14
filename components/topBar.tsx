import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Slide, Toolbar, Typography, useMediaQuery, useScrollTrigger } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import FavIcon from '../public/lasagnark8.png';

const pages = ['Villagers', 'Timeline', 'Stats', 'About'];

export default function TopBar({ component, setComponent }: {
  component: string,
  setComponent: Dispatch<SetStateAction<string>>,
}) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (<>
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      <AppBar color="secondary">
        <Toolbar>
          <Box sx={{display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              onClick={handleClick}
              sx={{
                ':hover': {
                  bgcolor: "success.main",
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
                  bgcolor: component === page ? 'success.main' : 'secondary.main',
                  ':hover': {
                    bgcolor: "success.main",
                  },
                  fontFamily: 'Coustard',
                }}
              >
                {page}
              </MenuItem>)}
            </Menu>
          </Box>
          <IconButton
            onClick={() => setComponent('Index')}
            size="small"
            sx={{
              mr: 1,
              ':hover': {
                bgcolor: "success.main"
              }
            }}
          >
            <Image
              src={FavIcon}
              alt="Animal Crossing Leaf"
              height={45}
            />
          </IconButton>
          <Typography
            variant="title"
            sx={{flexGrow: 1}}
            component={smallScreen? "h4" : "h2"}
          >
            My Animal Crossing Island
          </Typography>
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: 'black',
                  bgcolor: component === page ? 'success.main' : 'secondary.main',
                  ml: 1,
                  ':hover': {
                    bgcolor: "success.main",
                  },
                  fontFamily: 'Coustard',
                }}
                onClick={() => setComponent(page)}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
    <Toolbar />
  </>)
}