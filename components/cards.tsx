import ListRoundedIcon from '@mui/icons-material/ListRounded';
import { Box, Fab, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { DataContext } from '../pages';
import HistoryCard from './card';
import { ScreenContext } from '../pages';

export default function Cards() {

  const {
    histories,
    villagersData,
  } = useContext(DataContext);
  const mediumScreen = useContext(ScreenContext);

  const historiesArray = Array.from(histories.values());
  const [expandAll, setExpandAll] = useState(false);
  const theme = useTheme();

  return <>
    <Grid container spacing={2}>
      {historiesArray.map((history) =>
        <Grid
          item
          key={history.name}
        >
        <HistoryCard
          history={history}
          villagerData={villagersData.get(history.name)!}
          expandAll={expandAll}
        />
        </Grid>
      )}
    </Grid>
    <Box height={56} paddingTop={2}>
      <Typography>
        <Box
          bgcolor={theme.palette.secondary.main}
          component="span"
          sx={{
            py: .5,
            px: 1,
            borderRadius: Number.MAX_SAFE_INTEGER,
            border: "1px solid black",
            display: mediumScreen ? 'none' : 'inline',
          }}
        >
          CR
        </Box>
        <Box
          bgcolor={theme.palette.secondary.main}
          component="span"
          sx={{
            borderRadius: Number.MAX_SAFE_INTEGER,
            border: "1px solid black",
            height: '10px',
            width: '10px',
            display: mediumScreen ? 'inline-block' : 'none',
          }} />
        &nbsp;Current Resident
      </Typography>
    </Box>
    <Fab variant="extended" onClick={()=> setExpandAll((a)=> !a)} color="secondary" sx={{
      position: "fixed",
      right: "1%",
      bottom: "1%",
      ':hover': {
        bgcolor: "white"
      },
      fontFamily: 'Coustard',
    }}>
      <ListRoundedIcon sx={{mr: 1}} />
        {expandAll ? 'Collapse all' : 'Expand all'}
    </Fab>
  </>

}