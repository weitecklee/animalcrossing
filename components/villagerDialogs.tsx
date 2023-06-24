import { useState } from 'react';
import Grid from '@mui/material/Grid';
import VillagerDialogImage from './villagerDialogImage';
import VillagerDialog from './villagerDialog';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function VillagerDialogs({villagersData, history}:{ villagersData: Map<string, VillagerProperties2>, history: HistoryProperties[]}) {

  const [showDialog, setShowDialog] = useState(false);
  const [villager, setVillager] = useState('');

  return <>
    <Grid container spacing={2}>
      {history?.map((villager) =>
        <Grid
          item
          key={villager.name}
        >
          <VillagerDialogImage
            history={villager}
            villagerData={villagersData.get(villager.name)}
            setShowDialog={setShowDialog}
            setVillager={setVillager}
          />
        </Grid>
      )}
    </Grid>
  </>

}