import { Box, Button, Link, Typography } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import Image from 'next/image';
import AvatarPNG from '../public/avatar13.png';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const CustomDialog = dynamic(() => import('./customDialog'), {ssr: false})

export default function IndexComponent() {

  const [open, setOpen] = useState(false);

  return <>
    <Button onClick={() => setOpen(true)}>
      Click!
    </Button>
    <CustomDialog
      open={open}
      setOpen={setOpen}
      onClose={() => setOpen(false)}
    >
      <Typography>
        Does this thing work?!
      </Typography>
    </CustomDialog>
    <Typography>
      Hello there!
    </Typography>
    <Typography>
      This is a site I made to showcase my&nbsp;
      <Box component="span" sx={{fontStyle: 'italic'}}>
        Animal Crossing: New Horizons
      </Box>
      &nbsp;island.
      <br/>
      You can find the following pages and information:
      <br/>
      &emsp;&emsp;VILLAGERS: all the villagers that have been on my island
      <br/>
      &emsp;&emsp;TIMELINE: a timeline chart of the villagers
      <br/>
      &emsp;&emsp;STATS: all sorts of fun stats
      <br/>
      &emsp;&emsp;MAP: a map of my island (coming soon!)
      <br/>
      &emsp;&emsp;ABOUT: info about the game and me
      <br/>
      Enjoy your visit!
    </Typography>
    <Box py={2}>
      <Image
        src={AvatarPNG}
        alt="My Villager"
        priority
        style={{
          width: '90vw',
          maxWidth: 376,
          height: 'auto',
        }}
      />
    </Box>
    <Typography variant="caption">
      Special thanks to:
      <br />
      &emsp;&emsp;
      <Link
        href="https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch/"
        target="_blank"
        rel="noreferrer"
      >
        Nintendo
        <OpenInNewRoundedIcon fontSize='inherit'/>
      </Link>
      &nbsp;for making the Animal Crossing video games
      <br />
      &emsp;&emsp;
      <Link
        href="https://nookipedia.com/"
        target="_blank"
        rel="noopener"
      >
        Nookipedia
        <OpenInNewRoundedIcon fontSize='inherit'/>
      </Link>
      &nbsp;for providing all the villager data and media
      <br />
      <br />
      Made by&nbsp;
      <Link
        href="https://github.com/weitecklee"
        target="_blank"
        rel="noreferrer"
      >
        weitecklee
        <OpenInNewRoundedIcon fontSize='inherit'/>
      </Link>
    </Typography>
  </>
}