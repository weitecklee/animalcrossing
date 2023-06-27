import Box from '@mui/material/Box';
import Paper, {PaperProps} from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Draggable from 'react-draggable';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
import { VillagerProperties2, HistoryProperties } from '../types';

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
          top: '20%',
          left: '80%',
          padding: 2
        }}
      />
    </Draggable>
  )
}

export default function TimelineTooltip({villagerData, history}: { villagerData: VillagerProperties2, history: HistoryProperties}) {

  return (
      <DraggablePaper>
          <OpenWithRoundedIcon
            id="dragHandle"
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
            height={128}
            width={128}
          />
          <Box>
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
            <Typography display="inline">
            &nbsp;&nbsp;{villagerData.name}
            </Typography>
            <Typography>
              {history.startDateString}
            </Typography>
            <Typography>
              {!history.currentResident ? history.endDateString : 'Present'}
            </Typography>
            <Typography>
              {history.duration} days
            </Typography>
          </Box>
      </DraggablePaper>
  )
}