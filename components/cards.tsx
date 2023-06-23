import Grid from '@mui/material/Grid';
import HistoryCard from './card';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function Cards({villagersData, history}:{ villagersData: Map<string, VillagerProperties2>, history: HistoryProperties[]}) {

  return <Grid container spacing={2}>
    {history?.map((villager) =>
      <Grid
        item
        key={villager.name}
      >
        <HistoryCard
          history={villager}
          villagerData={villagersData.get(villager.name)}
        />
      </Grid>
    )}
  </Grid>
}