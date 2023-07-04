import InfoIcon from '@mui/icons-material/Info';
import { Box, Card, CardActionArea, CardContent, CardMedia, Collapse, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
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
        setShowVillagerDialog(true);
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
      <Box sx={{
          display: {
            xs: 'none',
            md: 'flex',
          }
        }}>
        <Collapse in={expanded} appear >
          <CardContent sx={{ position: 'relative' }}>
            <Content />
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}