import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Draggable from 'react-draggable';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { VillagerProperties2 } from '../types';

function DraggableBox(props: BoxProps) {
  return (
    <Draggable
      handle="#dragHandle"
    >
      <Box {...props} sx={{
        position: 'absolute',
        top: '20%',
        left: '80%'
      }}/>
    </Draggable>
  )
}
export default function TimelineTooltip({chart, tooltip, villagerData}: {chart: any, tooltip: any, villagerData: VillagerProperties2}) {

  return (
      <DraggableBox>
        <OpenWithIcon id="dragHandle" sx={{cursor: 'move'}} />
        <Typography>
          {villagerData.name}
        </Typography>
        <Image
          src={villagerData.nh_details.icon_url}
          alt={villagerData.name}
          height={128}
          width={128}
        />
      </DraggableBox>
  )

}