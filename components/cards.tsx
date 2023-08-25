import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { DataContext, ScreenContext } from '../pages';
import HistoryCard from './card';
import CRIcon from './crIcon';
import IconWithText from './iconWithText';

function Legend({mediumScreen}: {mediumScreen: boolean}) {
  return <>
    <Stack direction="row" alignItems="center">
      <CRIcon />
      <Typography variant={mediumScreen ? 'caption' : 'body1'} component='span'>
        &ensp;Current Resident
      </Typography>
    </Stack>
    <IconWithText
      Icon={ArrowForwardRoundedIcon}
      text={'Move-in date'}
      screenBoolean={mediumScreen}
    />
    <IconWithText
      Icon={CameraAltRoundedIcon}
      text={'Photo reception date'}
      screenBoolean={mediumScreen}
    />
    <IconWithText
      Icon={ArrowBackRoundedIcon}
      text={'Move-out date'}
      screenBoolean={mediumScreen}
    />
    <IconWithText
      Icon={AccessTimeRoundedIcon}
      text={'Duration of residence'}
      screenBoolean={mediumScreen}
    />
  </>
}

export default function Cards() {
  const {
    histories,
    villagersData,
  } = useContext(DataContext);
  const { mediumScreen } = useContext(ScreenContext);

  const historiesArray = Array.from(histories.values());

  return <Box position='relative'>
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
  </Box>
}