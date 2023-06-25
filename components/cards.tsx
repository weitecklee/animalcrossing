import { useState } from 'react';
import Grid from '@mui/material/Grid';
import HistoryCard from './card';
import CardDialog from './cardDialog';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function Cards({villagersData, histories}:{ villagersData: Map<string, VillagerProperties2>, histories: Map<string,HistoryProperties>}) {

  const [showDialog, setShowDialog] = useState(false);
  const [dialogVillager, setDialogVillager] = useState('');
  const historiesArray = Array.from(histories.values());

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
  </>

}