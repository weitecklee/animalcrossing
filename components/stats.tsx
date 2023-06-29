import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { VillagerProperties2, HistoryProperties, SpeciesDatumProperties } from '../types';
import { useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';

export default function Stats({ villagersData, histories, sortedDurations, speciesData } : { villagersData: Map<string,VillagerProperties2>, histories: Map<string,HistoryProperties>, sortedDurations: string[], speciesData: SpeciesDatumProperties[] }) {

  const [showAll, setShowAll] = useState(false);
  const [reverseOrder, setReverseOrder] = useState(false);
  const reversedSortedDuration = sortedDurations.slice().reverse();

  return <>
    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      <Box>
        <Typography variant="h6">
          Duration
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
        <List dense>
          {(reverseOrder ? reversedSortedDuration : sortedDurations).slice(0, showAll ? sortedDurations.length : 10).map((villager) => <ListItem key={villager}>
            <ListItemText>
              <Box display="flex" alignItems="center">
                <Image
                  src={villagersData.get(villager)?.nh_details.icon_url!}
                  alt={villager}
                  height={40}
                  width={40}
                />
                &nbsp;&nbsp;{villager}: {histories.get(villager)?.duration} days {histories.get(villager)?.currentResident ? "and counting" : ""}
              </Box>
            </ListItemText>
          </ListItem>)}
        </List>
      </Box>
      <Box>
        <Typography variant="h6">
          Species
        </Typography>
        <List dense>
          {speciesData.map((species, i) => <ListItemText key={species.species}>
              {species.species}: {species.count}
            <ImageList
              cols={4}
              gap={0}
              sx={{width:160}}
            >
              {speciesData[i].villagers.map((villager) => <ImageListItem key={villager}>
                <Image
                  src={villagersData.get(villager)?.nh_details.icon_url!}
                  alt={villager}
                  title={villager}
                  height={40}
                  width={40}
                />
              </ImageListItem>)}
            </ImageList>
          </ListItemText>)}
        </List>
      </Box>
    </Stack>

  </>
}