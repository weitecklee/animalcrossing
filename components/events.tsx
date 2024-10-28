import {
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useContext } from 'react';
import { DataContext, ScreenContext } from '../pages';
import VillagerIcon from './villagerIcon';
import { dateFormatter } from '../lib/functions';

const currentDate = new Date();

export default function Events() {
  const { eventData, villagersData } = useContext(DataContext);
  const { smallScreen, mediumScreen } = useContext(ScreenContext);
  const theme = useTheme();

  const determinePronoun = (villager: string) =>
    villagersData.get(villager)!.gender === 'Male' ? 'his' : 'her';

  const rewordEvent = (villager: string, event: string, date: Date): string => {
    if (event === 'gave photo') {
      return `${villager} gave ${determinePronoun(villager)} photo`;
    }
    if (event === 'birthday') {
      return `${villager} celebrated ${determinePronoun(villager)} birthday`;
    }
    if (event === 'moved in' && date > currentDate) {
      return `${villager} moving in`;
    }
    return `${villager} ${event}`;
  };

  return (
    <Paper
      elevation={4}
      sx={{
        background: theme.palette.success.light,
        px: mediumScreen ? 1 : 2,
      }}
    >
      <List dense={mediumScreen}>
        <Divider>
          <Chip label="Latest Happenings" color="secondary" />
        </Divider>
        {eventData.slice(0, smallScreen ? 3 : 10).map((eventDatum) => {
          const { date, event, villager } = eventDatum;
          const listItemKey = `${villager} ${event}`;
          const dateDate = new Date(date);
          return (
            <ListItem key={listItemKey}>
              <ListItemAvatar sx={{ pr: 1 }}>
                <VillagerIcon villager={villager} />
              </ListItemAvatar>
              <ListItemText
                primary={rewordEvent(villager, event, dateDate)}
                secondary={dateFormatter(dateDate)}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
