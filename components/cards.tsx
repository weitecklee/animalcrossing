import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Box, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { DataContext, ScreenContext } from '../pages';
import HistoryCard from './card';
import CRIcon from './crIcon';

export default function Cards() {
  const {
    histories,
    villagersData,
  } = useContext(DataContext);
  const { mediumScreen } = useContext(ScreenContext);

  const historiesArray = Array.from(histories.values());

  return <>
  {mediumScreen ?
    <Typography variant='caption'>
      <CRIcon />
      &ensp;Current Resident
      <br />
      <ArrowForwardRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;Move-in date
      <br />
      <ArrowBackRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;Move-out date
      <br />
      <AccessTimeRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;Duration of residence
    </Typography>
    :
    <Typography>
      <CRIcon />
      &nbsp;Current Resident
    </Typography>
  }
    <Grid container spacing={2} pt={1}>
      {historiesArray.map((history) =>
        <Grid
          item
          key={history.name}
        >
        <HistoryCard
          history={history}
          villagerData={villagersData.get(history.name)!}
        />
        </Grid>
      )}
    </Grid>
    <Box height={12} />
  </>

}