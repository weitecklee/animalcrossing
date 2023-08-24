import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { Box, Fab, Fade, Grid, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
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

  const [showScroll, setShowScroll] = useState(false);
  const timeoutID = useRef<NodeJS.Timeout>();
  const handleScroll = () => {
    setShowScroll(true);
    clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => {
      setShowScroll(false);
    }, 2000);
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
    <Fade in={showScroll}>
      <Box position='absolute' right='40px'>
        <Stack
          spacing={2}
          position="fixed"
          top="50%"
          sx={{
            transform: 'translateY(-50%)'
          }}
        >
          <Fab
            size="small"
            color="secondary"
            sx={{
              ':hover': {
                bgcolor: "white"
              },
            }}
            onClick={() => {
              window.scrollTo({top: 0, behavior: 'smooth'});
            }}
          >
            <KeyboardDoubleArrowUpRoundedIcon />
          </Fab>
          <Fab
            size="small"
            color="secondary"
            sx={{
              ':hover': {
                bgcolor: "white"
              },
            }}
            onClick={() => {
              window.scrollTo({top: document.documentElement.scrollHeight, behavior: 'smooth'});
            }}
          >
            <KeyboardDoubleArrowDownRoundedIcon />
          </Fab>
        </Stack>
      </Box>
    </Fade>
  </Box>
}