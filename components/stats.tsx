import { useState, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { Link, Dialog, DialogContent, Box, List, ListItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { VillagerProperties2, HistoryProperties, TraitProperties, DurationProperties } from '../types';

export default function Stats({ villagersData, histories, durationData, speciesData, personalityData, genderData } : {
  villagersData: Map<string,VillagerProperties2>,
  histories: Map<string,HistoryProperties>,
  durationData: DurationProperties[],
  speciesData: TraitProperties[],
  personalityData: TraitProperties[],
  genderData: TraitProperties[],
}) {

  const [dialogTraitData, setDialogTraitData] = useState<TraitProperties[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const VillagerIcon = ({villager}: {villager: string}) => (
    <Image
      src={villagersData.get(villager)?.nh_details.icon_url!}
      alt={villager}
      height={smallScreen ? 40 : 64}
      width={smallScreen ? 40 : 64}
      title={villager}
    />
  );

  const IconGrid = ({traitData}: {traitData: TraitProperties}) => (
    <Grid container>
      {traitData.villagers.map((villager) =>
        <Grid key={villager} item>
          <VillagerIcon villager={villager} />
        </Grid>
      )}
    </Grid>
  );

  const TraitDialog = () => (
    <Dialog
      open={showDialog}
      keepMounted
      onClose={() => setShowDialog(false)}
      maxWidth={false}
    >
      <DialogContent>
        {dialogTraitData.map((traitData) => (<>
          <Typography>
            {traitData.trait}: {traitData.count}
          </Typography>
          <IconGrid key={traitData.trait} traitData={traitData}/>
        </>))}
      </DialogContent>
    </Dialog>
  );

  const BreakdownLink = ({traitData} : {traitData: TraitProperties[]}) => (
    <Link
      href="#"
      underline="hover"
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setDialogTraitData(traitData);
        setShowDialog(true);
      }}
    >
      Full breakdown
    </Link>
  );

  return <>
    <Typography>
      Number of Villagers: {histories.size}
      <br />
      Average duration of residence: {(Array.from(histories.values()).reduce((a, b) => a + b.duration, 0) / histories.size).toFixed(2)} days
      <br />
      Longest duration of residence: {durationData[0].duration} days
      <br />
      {durationData[0].villagers.map((villager) => <VillagerIcon key={villager} villager={villager} />)}
      <br />
      Shortest duration of residence: {durationData[durationData.length - 1].duration} days
      <br />
      {durationData[durationData.length - 1].villagers.map((villager) => <VillagerIcon key={villager} villager={villager} />)}
      <br />
      <Link
        href="#"
        underline="hover"
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          setShowDurationDialog(true);
        }}
      >
        Full breakdown
      </Link>
      <br />
      Most common species: {speciesData[0].trait}
      <IconGrid traitData={speciesData[0]} />
      <BreakdownLink traitData={speciesData}/>
      <br />
      Most common personality: {personalityData[0].trait}
      <IconGrid traitData={personalityData[0]} />
      <BreakdownLink traitData={personalityData}/>
      <br />
      {genderData.map((gender) => `${gender.trait}: ${gender.count}`).join(', ')}
      <br />
      <BreakdownLink traitData={genderData}/>
    </Typography>
    <Dialog
      open={showDurationDialog}
      onClose={() => setShowDurationDialog(false)}
      maxWidth={false}
      keepMounted
    >
      <DialogContent>
        <Typography variant="caption">
          * = Current Resident
        </Typography>
        <List>
          {durationData.map((duration) => (
            duration.villagers.map((villager) => (
              <ListItem key={villager} disablePadding>
                <Box display="flex" alignItems="center">
                  <VillagerIcon villager={villager} />
                  <Typography>
                    &nbsp;&nbsp;{histories.get(villager)?.duration} days{histories.get(villager)?.currentResident ? "*" : ""}
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </Dialog>
    <TraitDialog />
  </>

}