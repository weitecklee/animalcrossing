import { Box, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from '../pages';
import VillagerIcon from './villagerIcon';
import { dateFormatter } from '../lib/functions';

export default function Events() {

  const { eventData, villagersData } = useContext(DataContext);

  const rewordEvent = (villager: string, event: string) : string => {
    if (event === 'gave photo') {
      if (villagersData.get(villager)!.gender === 'Male') {
        return `${villager} gave his photo`;
      }
      return `${villager} gave her photo`
    }
    return `${villager} ${event}`;
  }

  return <Box>
    <List>
      <Divider>
        <Chip label="Latest Happenings" color="secondary" />
      </Divider>
      {eventData.map((eventDatum) => {
        const {date, event, villager} = eventDatum;
        const listItemKey = `${villager} ${event}`;
        return <ListItem key={listItemKey}>
          <ListItemAvatar sx={{pr: 1}}>
            <VillagerIcon villager={villager}/>
          </ListItemAvatar>
          <ListItemText primary={rewordEvent(villager, event)} secondary={dateFormatter(new Date(date))}/>
        </ListItem>
        })}
    </List>
  </Box>

}