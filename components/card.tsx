import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Box, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useContext } from 'react';
import { dayOrDays } from '../lib/functions';
import { DataContext, ScreenContext } from '../pages';
import { HistoryProperties, VillagerProperties2 } from '../types';
import CRIcon from './crIcon';

export default function HistoryCard({ history, villagerData }: {
  history: HistoryProperties,
  villagerData: VillagerProperties2,
}) {

  const {
    setDialogVillager,
    setShowVillagerDialog,
  } = useContext(DataContext);
  const { mediumScreen } = useContext(ScreenContext);
  const theme = useTheme();

  if (mediumScreen) {
    return (
      <Paper elevation={5}
        sx={{
          background: theme.palette.success.main,
        }}
      >
        <Stack direction="row">
          <Image
            src={villagerData.nh_details.photo_url}
            alt={`${history.name} photo`}
            title={history.name}
            width={128}
            height={128}
          />
          <Box
            width={128}
            position="relative"
            padding={1}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant='subtitle2' fontFamily="Coustard">
                {history.name}
              </Typography>
              {history.currentResident ?
                <CRIcon /> : ''}
            </Stack>
            <Typography variant='caption' display="block">
              <ArrowForwardRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;
              {history.startDateString}
            </Typography>
              {!history.currentResident ? <Typography variant='caption' display="block">
              <ArrowBackRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;
                {history.endDateString}
              </Typography> : ''}
            <Typography variant='caption' display="block">
              <AccessTimeRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />&ensp;
              {dayOrDays(history.duration)}
            </Typography>
            <IconButton
              onClick={() => {
                setDialogVillager(history.name);
                setShowVillagerDialog(true);
              }}
              size='small'
              sx={{
                position: 'absolute',
                bottom:   '5px' ,
                right:  '5px',
              }}
            >
              <MoreHorizRoundedIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={5}
      sx={{
        background: theme.palette.success.main,
      }}
    >
      <Stack direction="row">
        <Image
          src={villagerData.nh_details.photo_url}
          alt={`${history.name} photo`}
          title={history.name}
          width={256}
          height={256}
        />
        <Box
          width={256}
          position="relative"
          padding={1}
        >
        <Stack direction="row" spacing={1}>
          <Typography variant='h6' fontFamily="Coustard">
            {history.name}
          </Typography>
          {history.currentResident ? <Typography>
            <CRIcon />
          </Typography> : ''}
        </Stack>
          <Typography>
            Moved in on {history.startDateString}
          </Typography>
          {history.photo ? <Typography>
            Photo received on {history.photoDateString}
            </Typography> : ""}
          {!history.currentResident ?
            <Typography>
              Moved out on {history.endDateString}
            </Typography>
          : ''}
          <Typography>
            Duration: {dayOrDays(history.duration)}
          </Typography>
          <IconButton
            onClick={() => {
              setDialogVillager(history.name);
              setShowVillagerDialog(true);
            }}
            size='medium'
            sx={{
              position: 'absolute',
              bottom:   '5px' ,
              right:  '5px',
            }}
          >
            <MoreHorizRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}