import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import Image from 'next/image';
import {
  Dispatch,
  ElementType,
  MouseEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ScreenContext } from '../pages';
import FavIcon from '../public/lasagnark8.png';

const pages = ['Villagers', 'Timeline', 'Stats', 'About'];

export default function TopBar({
  component,
  setComponent,
}: {
  component: string;
  setComponent: Dispatch<SetStateAction<string>>;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { smallScreen } = useContext(ScreenContext);

  const [titleComponent, setTitleComponent] = useState<ElementType<any>>('h2');
  useEffect(() => {
    setTitleComponent(smallScreen ? 'h4' : 'h2');
  }, [smallScreen]);

  return (
    <>
      <Slide appear={false} direction="down" in={!useScrollTrigger()}>
        <AppBar color="secondary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  onClick={handleClick}
                  sx={{
                    ':hover': {
                      bgcolor: 'success.main',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        setComponent(page);
                        handleClose();
                      }}
                      sx={{
                        bgcolor:
                          component === page
                            ? 'success.main'
                            : 'secondary.main',
                        ':hover': {
                          bgcolor: 'success.main',
                        },
                        fontFamily: 'Coustard',
                      }}
                    >
                      {page}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <IconButton
                onClick={() => setComponent('Index')}
                size="small"
                sx={{
                  mr: 1,
                  ':hover': {
                    bgcolor: 'success.main',
                  },
                }}
              >
                <Image src={FavIcon} alt="Animal Crossing Leaf" height={45} />
              </IconButton>
              <Typography
                variant="title"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setComponent('Index');
                }}
                component={titleComponent}
              >
                My Animal Crossing Island
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{
                      color: 'black',
                      bgcolor:
                        component === page ? 'success.main' : 'secondary.main',
                      ml: 1,
                      ':hover': {
                        bgcolor: 'success.main',
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
          </Container>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}
