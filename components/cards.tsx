import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Stack, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { DataContext, ScreenContext } from '../pages';
import HistoryCard from './card';
import CRIcon from './crIcon';

function Legend({mediumScreen}: {mediumScreen: boolean}) {
  return <>
    <Stack direction="row" alignItems="center">
      <CRIcon />
      <Typography variant={mediumScreen ? 'caption' : 'body1'} component='span'>
          &ensp;Current Resident
      </Typography>
    </Stack>
    <Typography variant={mediumScreen ? 'caption' : 'body1'}>
      <ArrowForwardRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;Move-in date
      <br />
      <CameraAltRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;Photo reception date
      <br />
      <ArrowBackRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;Move-out date
      <br />
      <AccessTimeRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;Duration of residence
    </Typography>
  </>
}

export default function Cards() {
  const {
    histories,
    villagersData,
  } = useContext(DataContext);
  const { mediumScreen } = useContext(ScreenContext);

  const historiesArray = Array.from(histories.values());

  return <>
    <Legend mediumScreen={mediumScreen} />
    <Grid container spacing={2} py={2} justifyContent='center'>
      {historiesArray.map((history) =>
        <Grid
          item
          key={history.name}
          minWidth={mediumScreen ? 'calc(128px + 9rem)': 'calc(192px + 12rem)'}
        >
        <HistoryCard
          history={history}
          villagerData={villagersData.get(history.name)!}
        />
        </Grid>
      )}
    </Grid>
    <Legend mediumScreen={mediumScreen} />
  </>
}