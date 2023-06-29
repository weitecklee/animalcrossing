import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { VillagerProperties2, HistoryProperties, SpeciesDatumProperties, PersonalityDatumProperties } from '../types';
import { ImageList, ImageListItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Stats({ villagersData, histories, sortedDurations, speciesData, personalityData } : {
  villagersData: Map<string,VillagerProperties2>,
  histories: Map<string,HistoryProperties>,
  sortedDurations: string[],
  speciesData: SpeciesDatumProperties[],
  personalityData: PersonalityDatumProperties[]
}) {

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return <>
    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      <Box>
        <Typography variant="h6">
          Duration
        </Typography>
        <Typography variant="caption">
          * = Current Resident
        </Typography>
        <List>
          {sortedDurations.map((villager) => <ListItem key={villager} disablePadding>
              <Box display="flex" alignItems="center">
                <Image
                  src={villagersData.get(villager)?.nh_details.icon_url!}
                  alt={villager}
                  height={40}
                  width={40}
                />
                <Typography variant={smallScreen ? 'body2' : 'body1'}>
                  &nbsp;&nbsp;{histories.get(villager)?.duration} days{histories.get(villager)?.currentResident ? "*" : ""}
                </Typography>
              </Box>
          </ListItem>)}
        </List>
      </Box>
      <Box>
        <Typography variant="h6">
          Species
        </Typography>
        <List>
          {speciesData.map((species, i) => <>
            <ListItem key={species.species} disableGutters>
              <Typography variant={smallScreen ? 'body2' : 'body1'} component="span">
                {species.species}: {species.count}
              </Typography></ListItem><ListItem disablePadding>
              <ImageList
                cols={smallScreen ? 3 : 5}
                gap={0}
              >
                {speciesData[i].villagers.map((villager) => <ImageListItem key={villager}>
                  <Image
                    src={villagersData.get(villager)?.nh_details.icon_url!}
                    alt={villager}
                    height={40}
                    width={40}
                  />
                </ImageListItem>)}
              </ImageList>
            </ListItem>
          </>)}
        </List>
      </Box>
      <Box>
        <Typography variant="h6">
          Personality
        </Typography>
        <List >
          {personalityData.map((personality, i) => <>
            <ListItem key={personality.personality} disableGutters>
              <Typography variant={smallScreen ? 'body2' : 'body1'} component="span">
                {personality.personality}: {personality.count}
              </Typography></ListItem><ListItem disablePadding>
              <ImageList
                cols={smallScreen ? 3 : 5}
                gap={0}
              >
                {personalityData[i].villagers.map((villager) => <ImageListItem key={villager}>
                  <Image
                    src={villagersData.get(villager)?.nh_details.icon_url!}
                    alt={villager}
                    height={40}
                    width={40}
                  />
                </ImageListItem>)}
              </ImageList>
            </ListItem>
          </>)}
        </List>
      </Box>
    </Stack>

  </>
}