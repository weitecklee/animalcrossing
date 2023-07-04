import ListRoundedIcon from '@mui/icons-material/ListRounded';
import { Box, Fab, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { HistoryProperties, VillagerProperties2 } from '../types';
import HistoryCard from './card';

export default function Cards({villagersData, histories, setDialogVillager, setShowVillagerDialog }:{
  villagersData: Map<string, VillagerProperties2>,
  histories: Map<string,HistoryProperties>,
  setDialogVillager: Dispatch<SetStateAction<string>>,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
}) {

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
            setShowVillagerDialog={setShowVillagerDialog}
            setDialogVillager={setDialogVillager}
            expandAll={expandAll}
          />
        </Grid>
      )}
    </Grid>
    <Box sx={{display: {xs: 'none', md: 'flex' }}}>
      <Fab variant="extended" onClick={()=> setExpandAll((a)=> !a)} color="secondary" sx={{
        position: "fixed",
        right: "1%",
        bottom: "1%",
        ':hover': {
          bgcolor: "white"
        }
      }}>
        <ListRoundedIcon sx={{mr: 1}} />
          {expandAll ? 'Collapse All' : 'Expand All'}
      </Fab>
    </Box>
    <Box sx={{display: {xs: 'flex', md: 'none' }}}>
      <Fab size="medium" onClick={()=> setExpandAll((a)=> !a)} color="secondary" sx={{
        position: "fixed",
        right: "1%",
        bottom: "1%",
        ':hover': {
          bgcolor: "white"
        }
      }}>
        <ListRoundedIcon />
      </Fab>
    </Box>
  </>

}