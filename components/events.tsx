import { Box, List, ListItem } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from '../pages';
import VillagerIcon from './villagerIcon';
import { dateFormatter } from '../lib/functions';

export default function Events() {

  const { eventData } = useContext(DataContext);

  return <Box>
    <List>
      {eventData.map((eventDatum) => {
        const {date, event, villager} = eventDatum;
        const listItemKey = `${villager} ${event}`;
        return <ListItem key={listItemKey}>
          {dateFormatter(new Date(date))} <VillagerIcon villager={villager}/> {event}
        </ListItem>
})}
    </List>
  </Box>

}