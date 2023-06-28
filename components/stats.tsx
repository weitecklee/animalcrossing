import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Image from 'next/image';
import { VillagerProperties2, HistoryProperties } from '../types';
import { useState } from 'react';

export default function Stats({ villagersData, histories, sortedDurations } : { villagersData: Map<string,VillagerProperties2>, histories: Map<string,HistoryProperties>, sortedDurations: string[] }) {

  const [showAll, setShowAll] = useState(false);
  const [reverseOrder, setReverseOrder] = useState(false);
  const reversedSortedDuration = sortedDurations.toReversed();

  return <>
    <Typography variant="h6">
      Villagers sorted by duration
    </Typography>
    <FormGroup>
      <FormControlLabel
        label="Show All"
        control={<Switch
          color="success"
          checked={showAll}
          onChange={() => setShowAll((a) => !a)}
        />}
      />
      <FormControlLabel
        label="Reverse Order"
        control={<Switch
          color="success"
          checked={reverseOrder}
          onChange={() => setReverseOrder((a) => !a)}
        />}
      />
    </FormGroup>
    <List>
      {(reverseOrder ? reversedSortedDuration : sortedDurations).slice(0, showAll ? sortedDurations.length : 10).map((villager) => <ListItem key={villager}>
        <ListItemText>
          <Box display="flex" alignItems="center">
            <Image
              src={villagersData.get(villager)?.nh_details.icon_url!}
              alt={villager}
              height={40}
              width={40}
            />
            &nbsp;&nbsp;{villager}, {histories.get(villager)?.duration} days {histories.get(villager)?.currentResident ? "and counting" : ""}
          </Box>
        </ListItemText>
      </ListItem>)}
    </List>
  </>
}