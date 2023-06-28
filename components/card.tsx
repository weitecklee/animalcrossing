import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InfoIcon from '@mui/icons-material/Info';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function HistoryCard({history, villagerData, setShowDialog, setDialogVillager, expandAll}: {history: HistoryProperties, villagerData: VillagerProperties2, setShowDialog: Dispatch<SetStateAction<boolean>>, setDialogVillager: Dispatch<SetStateAction<string>>, expandAll: boolean}) {

  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll])

  const Content = () => <>
    <Typography variant={smallScreen ? 'subtitle2' : 'h6'}>
      {history.name}
    </Typography>
    <Typography variant={smallScreen ? 'caption' : 'body1'}>
      {history.startDateString}
      <br />
      {!history.currentResident ? history.endDateString : 'Present'}
      <br />
      {history.duration} days
    </Typography>
    <IconButton
      onClick={() => {
        setDialogVillager(history.name);
        setShowDialog(true);
      }}
      size={smallScreen ? "small" : "medium"}
      sx={{
        position: 'absolute',
        bottom: smallScreen ? '15%' : 0,
        right: smallScreen ? '15%' : 0,
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
        <Content />
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