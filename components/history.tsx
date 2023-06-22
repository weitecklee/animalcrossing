import Grid from '@mui/material/Grid';
import HistoryCard from './historyCard';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function History({villagersData, history}:{ villagersData: Map<string, VillagerProperties2>, history: HistoryProperties[]}) {

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