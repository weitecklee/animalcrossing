import { useState, Dispatch, SetStateAction } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function HistoryCard({history, villagerData, setShowDialog, setDialogVillager}: {history: HistoryProperties, villagerData: VillagerProperties2, setShowDialog: Dispatch<SetStateAction<boolean>>, setDialogVillager: Dispatch<SetStateAction<string>>}) {

  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => setExpanded((a)=>!a)}>
        <CardMedia
          image={villagerData.nh_details.photo_url}
          sx={{ width: 150, height: 150 }}
        />
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">
            {history.name}
          </Typography>
          <Typography>
            {history.startDate.toLocaleDateString("fr-CA")}
          </Typography>
          <Typography>
            {!history.currentResident ? history.endDate.toLocaleDateString("fr-CA") : 'Present'}
          </Typography>
          <Typography>
            {Math.round((history.endDate.getTime() - history.startDate.getTime()) / (1000 * 3600 * 24)) + 1} days
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() => {
              setDialogVillager(history.name);
              setShowDialog(true);
            }}
            sx={{
              marginLeft: 'auto'
            }}
          >
            <InfoIcon />
          </IconButton>
        </CardActions>
      </Collapse>
    </Card>
  );
}