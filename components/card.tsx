import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Card, CardActionArea, CardMedia, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function HistoryCard({ history, villagerData, setShowVillagerDialog, setDialogVillager, expandAll }: {
  history: HistoryProperties,
  villagerData: VillagerProperties2,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
  setDialogVillager: Dispatch<SetStateAction<string>>,
  expandAll: boolean},
  ) {

  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll])

  const Content = () => <>
    <Typography variant={mediumScreen ? 'subtitle2' : 'h6'} fontFamily="Coustard">
      {history.name}
    </Typography>
    <Typography variant={mediumScreen ? 'caption' : 'body1'}>
      {history.startDateString}
      <br />
      {!history.currentResident ? history.endDateString : 'Present'}
      <br />
      {history.duration} days
    </Typography>
    <IconButton
      onClick={() => {
        setDialogVillager(history.name);
        setShowVillagerDialog(true);
      }}
      size={mediumScreen ? "small" : "medium"}
      sx={{
        position: 'absolute',
        bottom:   '15px' ,
        right:  '15px',
      }}
    >
      <InfoOutlinedIcon fontSize="inherit" />
    </IconButton>
    <IconButton
      onClick={() => {
        setExpanded(false);
      }}
      size={mediumScreen ? "small" : "medium"}
      sx={{
        position: 'absolute',
        top:   '0px' ,
        right:  '15px',
      }}
    >
      <HighlightOffRoundedIcon fontSize="inherit" />
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
        height="100%"
        width="100%"
        bgcolor='rgba(255, 255, 255, .8)'
        justifyContent="flex-start"
        alignItems="flex-start"
        padding={1}
        sx={{
          display: expanded ? 'flex' : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Content />
      </Stack>
    </Card>
  );
}