import { useState, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { Link, Dialog, DialogContent, Box, List, ListItem, Divider, Chip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { VillagerProperties2, HistoryProperties, TraitProperties, DurationProperties } from '../types';
import VillagerDialog from './villagerDialog';

export default function Stats({ villagersData, histories, durationData, speciesData, personalityData, genderData } : {
  villagersData: Map<string,VillagerProperties2>,
  histories: Map<string,HistoryProperties>,
  durationData: DurationProperties[],
  speciesData: TraitProperties[],
  personalityData: TraitProperties[],
  genderData: TraitProperties[],
}) {

  const [dialogTraitData, setDialogTraitData] = useState<TraitProperties[]>([]);
  const [showTraitDialog, setShowTraitDialog] = useState(false);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [showVillagerDialog, setShowVillagerDialog] = useState(false);
  const [dialogVillager, setDialogVillager] = useState('');
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const VillagerIcon = ({villager}: {villager: string}) => (
    <Image
      src={villagersData.get(villager)?.nh_details.icon_url!}
      alt={villager}
      height={smallScreen ? 40 : 64}
      width={smallScreen ? 40 : 64}
      title={villager}
      onClick={() => {
        setDialogVillager(villager);
        setShowVillagerDialog(true);
      }}
      style={{
        cursor: 'pointer',
      }}
    />
  );

  const IconGrid = ({traitData}: {traitData: TraitProperties}) => (
    <Grid container>
      {traitData.villagers.map((villager) =>
        <Grid key={villager}
          item
        >
          <VillagerIcon villager={villager} />
        </Grid>
      )}
    </Grid>
  );

  const BreakdownLink = ({traitData} : {traitData: TraitProperties[]}) => (
    <Link
      href="#"
      underline="hover"
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setDialogTraitData(traitData);
        setShowTraitDialog(true);
      }}
    >
      Full breakdown
    </Link>
  );

  return <>
    <Typography>
      Number of Villagers: {histories.size}
      <Divider><Chip label="DURATION OF RESIDENCE" /></Divider>
      Average: {(Array.from(histories.values()).reduce((a, b) => a + b.duration, 0) / histories.size).toFixed(2)} days
      <br />
      Longest: {durationData[0].duration} days
      <br />
      <IconGrid traitData={durationData[0]} />
      Shortest: {durationData[durationData.length - 1].duration} days
      <br />
      <IconGrid traitData={durationData[durationData.length - 1]} />
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
      <Divider><Chip label="SPECIES" /></Divider>
      Most common: {speciesData[0].trait}
      <IconGrid traitData={speciesData[0]} />
      <BreakdownLink traitData={speciesData}/>
      <Divider><Chip label="PERSONALITY" /></Divider>
      Most common: {personalityData[0].trait}
      <IconGrid traitData={personalityData[0]} />
      <BreakdownLink traitData={personalityData}/>
      <Divider><Chip label="GENDER" /></Divider>
      {genderData[0].trait}: {genderData[0].count}
      <br />
      {genderData[1].trait}: {genderData[1].count}
      <br />
      <BreakdownLink traitData={genderData}/>
    </Typography>
    <VillagerDialog
      history={histories.get(dialogVillager)!}
      villagerData={villagersData.get(dialogVillager)!}
      showDialog={showVillagerDialog}
      setShowDialog={setShowVillagerDialog}
    />
    <Dialog
      open={showDurationDialog}
      onClose={() => setShowDurationDialog(false)}
      maxWidth={false}
      keepMounted
      sx={{
        zIndex: 1200,
      }}
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
    <Dialog
      open={showTraitDialog}
      keepMounted
      onClose={() => setShowTraitDialog(false)}
      maxWidth={false}
      sx={{
        zIndex: 1200,
      }}
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
  </>

}