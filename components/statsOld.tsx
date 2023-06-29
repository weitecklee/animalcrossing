import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { VillagerProperties2, HistoryProperties, TraitProperties } from '../types';
import { ImageList, ImageListItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Stats({ villagersData, histories, sortedDurations, speciesData, personalityData, genderData } : {
  villagersData: Map<string,VillagerProperties2>,
  histories: Map<string,HistoryProperties>,
  sortedDurations: string[],
  speciesData: TraitProperties[],
  personalityData: TraitProperties[],
  genderData: TraitProperties[],
}) {

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const TraitBox = ({traitData, traitString} : {traitData: TraitProperties[], traitString: string}) => (
    <Box>
      <Typography variant="h6">
        {traitString}
      </Typography>
      <List>
        {traitData.map((trait, i) => <>
          <ListItem key={trait.trait} disableGutters>
            <Typography variant={smallScreen ? 'body2' : 'body1'} component="span">
              {trait.trait}: {trait.count}
            </Typography></ListItem><ListItem disablePadding>
            <ImageList
              cols={smallScreen ? 3 : 5}
              gap={0}
            >
              {traitData[i].villagers.map((villager) => <ImageListItem key={villager}>
                <Image
                  src={villagersData.get(villager)?.nh_details.icon_url!}
                  alt={villager}
                  height={40}
                  width={40}
                  title={villager}
                />
              </ImageListItem>)}
            </ImageList>
          </ListItem>
        </>)}
      </List>
    </Box>
  )

  return <>
    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      <Box minWidth={125}>
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
                  title={villager}
                />
                <Typography variant={smallScreen ? 'body2' : 'body1'}>
                  &nbsp;&nbsp;{histories.get(villager)?.duration} days{histories.get(villager)?.currentResident ? "*" : ""}
                </Typography>
              </Box>
          </ListItem>)}
        </List>
      </Box>
      <TraitBox traitData={speciesData} traitString="Species" />
      <TraitBox traitData={personalityData} traitString="Personality" />
      <TraitBox traitData={genderData} traitString="Gender" />
    </Stack>

  </>
}