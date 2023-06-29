import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function Timeline() {
  return <>
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
      &emsp;&emsp;STATS: all sorts of fun stats (coming soon!)
      <br/>
      &emsp;&emsp;MAP: a map of my island (coming soon!)
      <br/>
      Enjoy your visit!
      <br />
      <br />
      <br />
    </Typography>
    <Typography variant="caption">
      Special thanks to:
      <br />
      &emsp;
      <Link
        href="https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch/"
        target="_blank"
        rel="noreferrer"
        underline="hover"
      >
        Nintendo
      </Link>
      &nbsp;for making the Animal Crossing video games
      <br />
      &emsp;
      <Link
        href="https://nookipedia.com/"
        target="_blank"
        rel="noopener"
        underline="hover"
      >
        Nookipedia
      </Link>
      &nbsp;for providing all the villager data and media
    </Typography>
  </>
}