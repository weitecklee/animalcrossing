import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
import { Box, Stack, Typography } from '@mui/material';
import Paper, { PaperProps } from '@mui/material/Paper';
import Image from 'next/image';
import { Dispatch, SetStateAction, useContext } from 'react';
import Draggable from 'react-draggable';
import { ScreenContext } from '../pages';
import { HistoryProperties, VillagerProperties2 } from '../types';
import CRBadge from './crBadge';
import IconWithText from './iconWithText';
import { dayOrDays } from '../lib/functions';
import rgbDataURL from '../lib/rgbDataURL';

function DraggablePaper(props: PaperProps) {
  return (
    <Draggable handle="#dragHandle" bounds="parent">
      <Paper
        {...props}
        elevation={5}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          padding: 2,
        }}
        className="tooltipPaper"
      />
    </Draggable>
  );
}

export default function TimelineTooltip({
  villagerData,
  history,
  setShowVillagerDialog,
}: {
  villagerData: VillagerProperties2;
  history: HistoryProperties;
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const { smallScreen } = useContext(ScreenContext);

  return (
    <DraggablePaper>
      <OpenWithRoundedIcon
        id="dragHandle"
        fontSize={smallScreen ? 'small' : 'medium'}
        sx={{
          cursor: 'grab',
          '&:hover': {
            cursor: 'grab',
          },
          '&:active': {
            cursor: 'grabbing',
          },
          position: 'absolute',
          top: '1%',
          left: '1%',
        }}
      />
      <Box
        onClick={() => {
          setShowVillagerDialog(true);
        }}
        sx={{
          cursor: 'pointer',
        }}
      >
        <CRBadge invisible={!history.currentResident}>
          <Image
            src={villagerData.nh_details.icon_url}
            alt={villagerData.name}
            height={smallScreen ? 64 : 128}
            width={smallScreen ? 64 : 128}
            title={villagerData.name}
            placeholder="blur"
            blurDataURL={rgbDataURL(villagerData.title_color)}
            key={villagerData.nh_details.icon_url}
          />
        </CRBadge>
        <Stack direction="row" alignItems="center">
          <span
            style={{
              display: 'inline-block',
              height: '10px',
              width: '20px',
              backgroundColor: '#' + villagerData.title_color,
              border: '1px solid black',
              borderRadius: Number.MAX_SAFE_INTEGER,
            }}
          ></span>
          <Typography
            display="inline"
            variant={smallScreen ? 'subtitle2' : 'h6'}
            fontFamily="Coustard"
          >
            &ensp;{villagerData.name}
          </Typography>
        </Stack>
        <IconWithText
          Icon={ArrowForwardRoundedIcon}
          text={history.startDateString}
          screenBoolean={smallScreen}
        />
        {!history.currentResident ? (
          <IconWithText
            Icon={ArrowBackRoundedIcon}
            text={history.endDateString}
            screenBoolean={smallScreen}
          />
        ) : (
          ''
        )}
        <IconWithText
          Icon={AccessTimeRoundedIcon}
          text={dayOrDays(history.duration)}
          screenBoolean={smallScreen}
        />
      </Box>
    </DraggablePaper>
  );
}
