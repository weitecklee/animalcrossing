import { Dispatch, SetStateAction } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const pages = ['Villagers', 'Timeline'];

export default function TopBar({setComponent}: { setComponent: Dispatch<SetStateAction<string>> }) {
  return (
    <>
      <AppBar color="secondary">
        <Toolbar>
            <Button>
              <Avatar
                variant="square"
                src="/Animal_Crossing_Leaf.svg"
                onClick={() => setComponent('Index')}
              />
            </Button>
            <Typography variant="h5" fontWeight="500" sx={{flexGrow: 1}}>
              My Animal Crossing Island
            </Typography>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{color:'black', mx: 1}}
                onClick={() => setComponent(page)}
              >
                {page}
              </Button>
            ))}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}