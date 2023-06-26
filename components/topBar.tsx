import { Dispatch, SetStateAction } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import LeafIcon from '../public/Animal_Crossing_Leaf.svg'

const pages = ['Villagers', 'Timeline'];

export default function TopBar({setComponent}: { setComponent: Dispatch<SetStateAction<string>> }) {
  return (
    <>
      <AppBar color="secondary">
        <Toolbar>
          <Button
            onClick={() => setComponent('Index')}
          >
            <Image
              src={LeafIcon}
              alt="Animal Crossing Leaf"
              height={42}
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