import { useState, Dispatch, SetStateAction } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InfoIcon from '@mui/icons-material/Info';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function HistoryCard({history, villagerData, setShowDialog, setDialogVillager}: {history: HistoryProperties, villagerData: VillagerProperties2, setShowDialog: Dispatch<SetStateAction<boolean>>, setDialogVillager: Dispatch<SetStateAction<string>>}) {

  const [expanded, setExpanded] = useState(false);
  const Content = ({mobile = false}) => <>
    <Typography variant={mobile ? 'subtitle2' : 'h6'}>
      {history.name}
    </Typography>
    <Typography variant={mobile ? 'caption' : 'body1'}>
      {history.startDateString}
    </Typography>
    <Typography variant={mobile ? 'caption' : 'body1'}>
      {!history.currentResident ? history.endDateString : 'Present'}
    </Typography>
    <Typography variant={mobile ? 'caption' : 'body1'}>
      {history.duration} days
    </Typography>
    <IconButton
      onClick={() => {
        setDialogVillager(history.name);
        setShowDialog(true);
      }}
      size={mobile ? "small" : "medium"}
      sx={{
        position: 'absolute',
        bottom: mobile ? '15%' : 0,
        right: mobile ? '15%' : 0,
      }}
    >
      <InfoIcon fontSize="inherit" />
    </IconButton>
  </>

  return (
    <Card variant="outlined" sx={{position: 'relative'}}>
      <CardActionArea onClick={() => setExpanded((a)=>!a)}>
        <CardMedia
          image={villagerData.nh_details.photo_url}
          sx={{ width: {
            xs: 100,
            md: 150,
          }, height: {
            xs: 100,
            md: 150,
          } }}
        >
        </CardMedia>
      </CardActionArea>
      <Stack
        height={100}
        width={100}
        bgcolor='rgba(255, 255, 255, .8)'
        justifyContent="flex-start"
        alignItems="flex-start"
        padding={1}
        sx={{
          display: expanded ? {xs: 'flex', md: 'none'} : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Content mobile={true} />
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{
        display: {
          xs: 'none',
          md: 'flex',
        }
      }}>
        <CardContent sx={{ position: 'relative' }}>
          <Content />
        </CardContent>
      </Collapse>
    </Card>
  );
}