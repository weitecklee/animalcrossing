import Grid from '@mui/material/Grid';
import HistoryCard from './card';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function Cards({villagersData, histories}:{ villagersData: Map<string, VillagerProperties2>, histories: Map<string,HistoryProperties>}) {

  const historiesArray = Array.from(histories.values());

  return <Grid container spacing={2}>
    {historiesArray.map((history) =>
      <Grid
        item
        key={history.name}
      >
        <HistoryCard
          history={history}
          villagerData={villagersData.get(history.name)!}
        />
      </Grid>
    )}
  </Grid>
}