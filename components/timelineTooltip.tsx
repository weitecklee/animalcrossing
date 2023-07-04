import InfoIcon from '@mui/icons-material/Info';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
import { Box, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import Paper, { PaperProps } from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import Draggable from 'react-draggable';
import { HistoryProperties, VillagerProperties2 } from '../types';

function DraggablePaper(props: PaperProps) {
  return (
    <Draggable
      handle="#dragHandle"
      bounds="parent"
    >
      <Paper
        {...props}
        elevation={2}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          padding: 2
        }}
      />
    </Draggable>
  )
}

export default function TimelineTooltip({ villagerData, history, setShowVillagerDialog }: {
  villagerData: VillagerProperties2,
  history: HistoryProperties,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
}) {

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
      <DraggablePaper>
        <OpenWithRoundedIcon
          id="dragHandle"
          fontSize={smallScreen ? 'small' : 'medium'}
          sx={{
            cursor: 'move',
            position: 'absolute',
            top: '1%',
            left: '1%',
          }}
        />
        <Image
          src={villagerData.nh_details.icon_url}
          alt={villagerData.name}
          height={smallScreen ? 64 : 128}
          width={smallScreen ? 64 : 128}
          title={villagerData.name}
        />
        <Box>
          <Stack direction="row" alignItems="center">
            <span
              style={{
                display: 'inline-block',
                height: '10px',
                width: '20px',
                backgroundColor: '#' + villagerData.title_color,
                border: '1px solid black',
                borderRadius: 50
              }}
            >
            </span>
            <Typography display="inline" variant={smallScreen ? 'subtitle2' : 'h6'} >
            &nbsp;&nbsp;{villagerData.name}
            </Typography>
          </Stack>
          <Typography variant={smallScreen ? 'caption' : 'body1'}>
            {history.startDateString}
            <br />
            {!history.currentResident ? history.endDateString : 'Present'}
            <br />
            {history.duration} days
          </Typography>
        </Box>
        <IconButton
          onClick={() => {
            setShowVillagerDialog(true);
          }}
          size={smallScreen ? "small" : "medium"}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          <InfoIcon fontSize="inherit" />
        </IconButton>
      </DraggablePaper>
  )
}