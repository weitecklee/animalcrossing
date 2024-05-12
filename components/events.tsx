import { Box, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from '../pages';
import VillagerIcon from './villagerIcon';
import { dateFormatter } from '../lib/functions';

export default function Events() {

  const { eventData } = useContext(DataContext);

  return <Box>
    <List>
      <Divider>
        <Chip label="Latest Happenings" color="secondary" />
      </Divider>
      {eventData.map((eventDatum) => {
        const {date, event, villager} = eventDatum;
        const listItemKey = `${villager} ${event}`;
        return <ListItem key={listItemKey}>
          <ListItemAvatar>
            <VillagerIcon villager={villager}/>
          </ListItemAvatar>
          <ListItemText primary={event} secondary={dateFormatter(new Date(date))}/>
        </ListItem>
        })}
    </List>
  </Box>

}