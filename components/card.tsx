import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { dayOrDays } from '../lib/functions';
import rgbDataURL from '../lib/rgbDataURL';
import { DataContext, ScreenContext } from '../pages';
import { HistoryProperties, VillagerProperties2 } from '../types';
import CRIcon from './crIcon';
import IconWithText from './iconWithText';

const lowElevation = 4;
const highElevation = 14;

export default function HistoryCard({
  history,
  villagerData,
}: {
  history: HistoryProperties;
  villagerData: VillagerProperties2;
}) {
  const { setDialogVillager, setShowVillagerDialog } = useContext(DataContext);
  const { mediumScreen } = useContext(ScreenContext);
  const theme = useTheme();
  const [elevation, setElevation] = useState(lowElevation);

  return (
    <Paper
      elevation={elevation}
      sx={{
        background: theme.palette.success.light,
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => {
        setDialogVillager(history.name);
        setShowVillagerDialog(true);
      }}
      onMouseOver={() => {
        setElevation(highElevation);
      }}
      onMouseOut={() => {
        setElevation(lowElevation);
      }}
    >
      <Stack direction="row">
        <Image
          src={villagerData.nh_details.photo_url}
          alt={`${history.name} photo`}
          title={history.name}
          width={mediumScreen ? 128 : 192}
          height={mediumScreen ? 128 : 192}
          placeholder="blur"
          blurDataURL={rgbDataURL(villagerData.title_color)}
        />
        <Box padding={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant={mediumScreen ? 'subtitle2' : 'h6'}
              fontFamily="Coustard"
            >
              {history.name}
            </Typography>
            {history.currentResident ? <CRIcon /> : ''}
          </Stack>
          <IconWithText
            Icon={ArrowForwardRoundedIcon}
            text={history.startDateString}
            screenBoolean={mediumScreen}
          />
          {history.photo ? (
            <IconWithText
              Icon={CameraAltRoundedIcon}
              text={history.photoDateString}
              screenBoolean={mediumScreen}
            />
          ) : (
            ''
          )}
          {!history.currentResident ? (
            <IconWithText
              Icon={ArrowBackRoundedIcon}
              text={history.endDateString}
              screenBoolean={mediumScreen}
            />
          ) : (
            ''
          )}
          <IconWithText
            Icon={AccessTimeRoundedIcon}
            text={dayOrDays(history.duration)}
            screenBoolean={mediumScreen}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
