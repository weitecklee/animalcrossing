import { Box, Chip, Dialog, DialogContent, Divider, Grid, Link, List, ListItem, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { DurationProperties, HistoryProperties, PhotoStatsProperties, TraitProperties, VillagerProperties2 } from '../types';
import CustomDialog from './customDialog';

export default function Stats({ villagersData, histories, durationData, speciesData, personalityData, genderData, photoData, photoStats, currentResidents, setDialogVillager, setShowVillagerDialog } : {
  villagersData: Map<string,VillagerProperties2>,
  histories: Map<string,HistoryProperties>,
  durationData: DurationProperties[],
  speciesData: TraitProperties[],
  personalityData: TraitProperties[],
  genderData: TraitProperties[],
  photoData: DurationProperties[],
  photoStats: PhotoStatsProperties,
  currentResidents: string[],
  setDialogVillager: Dispatch<SetStateAction<string>>,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
}) {

  const [dialogTraitData, setDialogTraitData] = useState<TraitProperties[]>([]);
  const [showTraitDialog, setShowTraitDialog] = useState(false);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
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
      underline="none"
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setDialogTraitData(traitData);
        setShowTraitDialog(true);
      }}
    >
      Full breakdown
        <ReadMoreRoundedIcon fontSize="inherit" />
    </Link>
  );

  return <>
    <Typography>
      Number of Villagers: {histories.size}
      <br />
      Current villagers:
    </Typography>
      <Grid container>
        {currentResidents.map((villager) =>
          <Grid key={villager}
            item
          >
            <VillagerIcon villager={villager} />
          </Grid>
        )}
      </Grid>
    <Divider>
      <Chip label="DURATION OF RESIDENCE" />
    </Divider>
    <Typography>
      Average: {(Array.from(histories.values()).reduce((a, b) => a + b.duration, 0) / histories.size).toFixed(2)} days
      <br />
      Longest: {durationData[0].duration} days
      <br />
    </Typography>
    <IconGrid traitData={durationData[0]} />
    <Typography>
      Shortest: {durationData[durationData.length - 1].duration} days
      <br />
    </Typography>
    <IconGrid traitData={durationData[durationData.length - 1]} />
    <Typography>
      <Link
        href="#"
        underline="none"
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          setShowDurationDialog(true);
        }}
      >
        Full breakdown
        <ReadMoreRoundedIcon fontSize="inherit" />
      </Link>
    </Typography>
    <Divider>
      <Chip label="SPECIES" />
    </Divider>
    <Typography>
      Most common: {speciesData[0].trait}
    </Typography>
    <IconGrid traitData={speciesData[0]} />
    <Typography>
      <BreakdownLink traitData={speciesData}/>
    </Typography>
    <Divider>
      <Chip label="PERSONALITY" />
    </Divider>
    <Typography>
      Most common: {personalityData[0].trait}
    </Typography>
    <IconGrid traitData={personalityData[0]} />
    <Typography>
      <BreakdownLink traitData={personalityData}/>
    </Typography>
    <Divider>
      <Chip label="GENDER" />
    </Divider>
    <Typography>
      {genderData[0].trait}: {genderData[0].count}
      <br />
      {genderData[1].trait}: {genderData[1].count}
      <br />
      <BreakdownLink traitData={genderData}/>
    </Typography>
    <Divider>
      <Chip label="PHOTOS" />
    </Divider>
    <Typography>
      Received: {photoStats.count}
      <br />
      Average time to receive: {photoStats.average.toFixed(2)} days
      <br />
      Quickest: {photoData[0].trait} days
    </Typography>
    <IconGrid traitData={photoData[0]} />
    <Typography>
      Slowest: {photoData[photoData.length - 1].trait} days
    </Typography>
    <IconGrid traitData={photoData[photoData.length - 1]} />
    <Typography>
      <Link
        href="#"
        underline="none"
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          setShowPhotoDialog(true);
        }}
      >
        Full breakdown
        <ReadMoreRoundedIcon fontSize="inherit" />
      </Link>
    </Typography>
    <CustomDialog
      open={showDurationDialog}
      onClose={() => setShowDurationDialog(false)}
      maxWidth={false}
      keepMounted
      zIndex={1200}
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
                    &nbsp;&nbsp;{duration.trait} days{histories.get(villager)?.currentResident ? "*" : ""}
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={showTraitDialog}
      keepMounted
      onClose={() => setShowTraitDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
        {dialogTraitData.map((traitData) => (<Box key={traitData.trait}>
          <Typography>
            {traitData.trait}: {traitData.count}
          </Typography>
          <IconGrid traitData={traitData}/>
        </Box>))}
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={showPhotoDialog}
      onClose={() => setShowPhotoDialog(false)}
      maxWidth={false}
      keepMounted
      zIndex={1200}
    >
      <DialogContent>
        <List>
          {photoData.map((photo) => (
            photo.villagers.map((villager) => (
              <ListItem key={villager} disablePadding>
                <Box display="flex" alignItems="center">
                  <VillagerIcon villager={villager} />
                  <Typography>
                    &nbsp;&nbsp;{photo.trait} days
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </CustomDialog>
  </>

}