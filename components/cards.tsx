import ListRoundedIcon from '@mui/icons-material/ListRounded';
import { Box, Fab, Grid, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { DataContext } from '../pages';
import HistoryCard from './card';
import CRIcon from './crIcon';

export default function Cards() {

  const {
    histories,
    villagersData,
  } = useContext(DataContext);

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
          expandAll={expandAll}
        />
        </Grid>
      )}
    </Grid>
    <Box height={100} paddingTop={2}>
      <Typography>
        <CRIcon />
        &nbsp;Current Resident
      </Typography>
    </Box>
    <Fab variant="extended" onClick={()=> setExpandAll((a)=> !a)} color="secondary" sx={{
      position: "fixed",
      left: "1%",
      bottom: "1%",
      ':hover': {
        bgcolor: "white"
      },
      fontFamily: 'Coustard',
    }}>
      <ListRoundedIcon sx={{mr: 1}} />
        {expandAll ? 'Collapse all' : 'Expand all'}
    </Fab>
  </>

}