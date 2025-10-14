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

  const rewordEvent = (villager: string, event: Number, date: Date): string => {
    date.setTime(date.getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000);
    if (event === 2) {
      return `${villager} gave ${determinePronoun(villager)} photo`;
    }
    if (event === 1) {
      if (date > currentDate) {
        return `${villager} celebrating ${determinePronoun(villager)} birthday`;
      }
      return `${villager} celebrated ${determinePronoun(villager)} birthday`;
    }
    if (event === 0) {
      if (date > currentDate) {
        return `${villager} moving in`;
      }
      return `${villager} moved in`;
    }
    if (date > currentDate) {
      return `${villager} moving out`;
    }
    return `${villager} moved out`;
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
