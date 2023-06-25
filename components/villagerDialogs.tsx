import { useState } from 'react';
import Grid from '@mui/material/Grid';
import VillagerDialogImage from './villagerDialogImage';
import VillagerDialog from './villagerDialog';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function VillagerDialogs({villagersData, histories}:{ villagersData: Map<string, VillagerProperties2>, histories: Map<string,HistoryProperties>}) {

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
          <VillagerDialogImage
            history={history}
            villagerData={villagersData.get(history.name)!}
            setShowDialog={setShowDialog}
            setDialogVillager={setDialogVillager}
          />
        </Grid>
      )}
    </Grid>
    {showDialog && <VillagerDialog
      history={histories.get(dialogVillager)!}
      villagerData={villagersData.get(dialogVillager)!}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
    />}
  </>

}