import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import HistoryCard from './card';
import CardDialog from './cardDialog';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function Cards({villagersData, histories}:{ villagersData: Map<string, VillagerProperties2>, histories: Map<string,HistoryProperties>}) {

  const [showDialog, setShowDialog] = useState(false);
  const [dialogVillager, setDialogVillager] = useState('');
  const historiesArray = Array.from(histories.values());
  const [expandAll, setExpandAll] = useState(false);

  return <>
    <Grid container spacing={2}>
      {historiesArray.map((history) =>
        <Grid
          item
          key={history.name}
        >
          <HistoryCard
            history={history}
            villagerData={villagersData.get(history.name)!}
            setShowDialog={setShowDialog}
            setDialogVillager={setDialogVillager}
            expandAll={expandAll}
          />
        </Grid>
      )}
    </Grid>
    {showDialog && <CardDialog
      history={histories.get(dialogVillager)!}
      villagerData={villagersData.get(dialogVillager)!}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
    />}
    <Box sx={{display: {xs: 'none', md: 'flex' }}}>
      <Fab variant="extended" onClick={()=> setExpandAll((a)=> !a)} color="secondary" sx={{
        position: "fixed",
        right: "5%",
        bottom: "5%"
      }}>
        <ListRoundedIcon sx={{mr: 1}} />
          {expandAll ? 'Collapse All' : 'Expand All'}
      </Fab>
    </Box>
    <Box sx={{display: {xs: 'flex', md: 'none' }}}>
      <Fab size="medium" onClick={()=> setExpandAll((a)=> !a)} color="secondary" sx={{
        position: "fixed",
        right: "5%",
        bottom: "5%"
      }}>
        <ListRoundedIcon />
      </Fab>
    </Box>
  </>

}