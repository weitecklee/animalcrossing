import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function HistoryCard({history, villagerData}: {history: HistoryProperties, villagerData: VillagerProperties2 | undefined}) {

  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="outlined" onClick={() => setExpanded((a)=>!a)}>
      <CardActionArea>
        <CardMedia
          image={villagerData?.nh_details.photo_url}
          sx={{ width: 150, height: 150 }}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6">
              {history?.name}
            </Typography>
            <Typography>
              {history?.startDate.toLocaleDateString("en-ZA")}
            </Typography>
            <Typography>
              {!history?.currentResident ? history?.endDate.toLocaleDateString("en-ZA") : 'Present'}
            </Typography>
            <Typography>
              {Math.round((history?.endDate.getTime() - history?.startDate.getTime()) / (1000 * 3600 * 24)) + 1} days
            </Typography>
          </CardContent>
        </Collapse>
      </CardActionArea>
    </Card>
  );
}