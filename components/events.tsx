import { Paper, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material';
import { useContext } from 'react';
import { DataContext, ScreenContext } from '../pages';
import VillagerIcon from './villagerIcon';
import { dateFormatter } from '../lib/functions';

export default function Events() {

  const { eventData, villagersData } = useContext(DataContext);
  const { smallScreen, mediumScreen } = useContext(ScreenContext);
  const theme = useTheme();

  const rewordEvent = (villager: string, event: string) : string => {
    if (event === 'gave photo') {
      if (villagersData.get(villager)!.gender === 'Male') {
        return `${villager} gave his photo`;
      }
      return `${villager} gave her photo`
    }
    return `${villager} ${event}`;
  }

  return <Paper
    elevation={4}
    sx={{
      background: theme.palette.success.light,
      px: 2,
    }}
  >
    <List dense={mediumScreen} >
      <Divider>
        <Chip label="Latest Happenings" color="secondary" />
      </Divider>
      {eventData.slice(0, smallScreen ? 3 : 10).map((eventDatum) => {
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
  </Paper>

}