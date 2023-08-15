import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
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

  return (
    <Paper
      elevation={5}
      sx={{
        background: theme.palette.success.light,
        position: 'relative',
      }}
    >
      <Stack direction="row">
        <Image
          src={villagerData.nh_details.photo_url}
          alt={`${history.name} photo`}
          title={history.name}
          width={mediumScreen ? 128 : 192}
          height={mediumScreen ? 128 : 192}
        />
        <Box
          padding={1}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant={mediumScreen ? 'subtitle2' : 'h6'} fontFamily="Coustard">
              {history.name}
            </Typography>
            {history.currentResident ? <CRIcon /> : ''}
          </Stack>
          <Typography variant={mediumScreen ? 'caption' : 'body1'} display="block">
            <ArrowForwardRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />
            &ensp;{history.startDateString}
          </Typography>
          {history.photo ? <Typography variant={mediumScreen ? 'caption' : 'body1'} display="block">
              <CameraAltRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />
              &ensp;{history.photoDateString}
          </Typography> : ''}
          {!history.currentResident ? <Typography variant={mediumScreen ? 'caption' : 'body1'} display="block">
          <ArrowBackRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />
            &ensp;{history.endDateString}
          </Typography> : ''}
          <Typography variant={mediumScreen ? 'caption' : 'body1'} display="block">
            <AccessTimeRoundedIcon fontSize='inherit' sx={{verticalAlign: 'middle'}} />
            &ensp;{dayOrDays(history.duration)}
          </Typography>
          <IconButton
            onClick={() => {
              setDialogVillager(history.name);
              setShowVillagerDialog(true);
            }}
            size={mediumScreen ? 'small' : 'medium'}
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