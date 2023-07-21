import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import { Box, Chip, DialogContent, Divider, Grid, Link, List, ListItem, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { dayOrDays } from '../lib/functions';
import { DurationProperties, HistoryProperties, PhotoStats2Properties, PhotoStatsProperties, TraitProperties, VillagerProperties2 } from '../types';
import CustomDialog from './customDialog';
import IconGrid from './iconGrid';
import VillagerIcon from './villagerIcon';

export default function Stats({ villagersData, histories, durationData, speciesData, personalityData, genderData, photoData, photoStats, photoStats2, currentResidents, setDialogVillager, setShowVillagerDialog, contemporariesData } : {
  villagersData: Map<string,VillagerProperties2>,
  histories: Map<string,HistoryProperties>,
  durationData: DurationProperties[],
  speciesData: TraitProperties[],
  personalityData: TraitProperties[],
  genderData: TraitProperties[],
  photoData: DurationProperties[],
  photoStats: PhotoStatsProperties,
  photoStats2: PhotoStats2Properties,
  currentResidents: string[],
  setDialogVillager: Dispatch<SetStateAction<string>>,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
  contemporariesData: DurationProperties[],
}) {

  const [dialogTraitData, setDialogTraitData] = useState<TraitProperties[]>([]);
  const [showTraitDialog, setShowTraitDialog] = useState(false);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [showContemporariesDialog, setShowContemporariesDialog] = useState(false);
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const BreakdownLink = ({traitData, onClick} : {
    traitData?: TraitProperties[],
    onClick?: () => void,
  }) => (
    <Link
      href="#"
      underline="none"
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (traitData) {
          setDialogTraitData(traitData);
          setShowTraitDialog(true);
        } else {
          onClick!();
        }
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
            <VillagerIcon
              villager={villager}
              villagersData={villagersData}
              mediumScreen={mediumScreen}
              setDialogVillager={setDialogVillager}
              setShowVillagerDialog={setShowVillagerDialog}
            />
          </Grid>
        )}
      </Grid>
    <Divider>
      <Chip label="Duration of Residence" color="secondary" />
    </Divider>
    <Typography>
      Average: {(Array.from(histories.values()).reduce((a, b) => a + b.duration, 0) / histories.size).toFixed(2)} days
      <br />
      Longest: {(durationData[0].duration)} days
      <br />
    </Typography>
    <IconGrid
      traitData={durationData[0]}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <Typography>
      Shortest: {dayOrDays(durationData[durationData.length - 1].duration)}
      <br />
    </Typography>
    <IconGrid
      traitData={durationData[durationData.length - 1]}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <BreakdownLink onClick={() => {setShowDurationDialog(true);}} />
    <Divider>
      <Chip label="Species" color="secondary" />
    </Divider>
    <Typography>
      Most common: {speciesData[0].trait}
    </Typography>
    <IconGrid
      traitData={speciesData[0]}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <Typography>
      <BreakdownLink traitData={speciesData}/>
    </Typography>
    <Divider>
      <Chip label="Personality" color="secondary" />
    </Divider>
    <Typography>
      Most common: {personalityData[0].trait}
    </Typography>
    <IconGrid
      traitData={personalityData[0]}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <Typography>
      <BreakdownLink traitData={personalityData}/>
    </Typography>
    <Divider>
      <Chip label="Gender" color="secondary" />
    </Divider>
    <Typography>
      {genderData[0].trait}: {genderData[0].count}
      <br />
      {genderData[1].trait}: {genderData[1].count}
      <br />
      <BreakdownLink traitData={genderData}/>
    </Typography>
    <Divider>
      <Chip label="Photos" color="secondary" />
    </Divider>
    <Typography>
      Received: {photoStats.count} ({(photoStats.count / histories.size * 100).toFixed(2)}%)
      <br />
      Average time to receive: {photoStats.average.toFixed(2)} days
      <br />
      Quickest: {photoData[0].trait} days
    </Typography>
    <IconGrid
      traitData={photoData[0]}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <Typography>
      Slowest: {photoData[photoData.length - 1].trait} days
    </Typography>
    <IconGrid
      traitData={photoData[photoData.length - 1]}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <Typography>
      Shortest stay after receving photo: {dayOrDays(photoStats2.shortestAfterReceiving.duration - 1)}
    </Typography>
    <IconGrid
      traitData={photoStats2.shortestAfterReceiving}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <Typography>
      Longest stay after receiving photo: {dayOrDays(photoStats2.longestAfterReceiving.duration - 1)}
    </Typography>
    <IconGrid
      traitData={photoStats2.longestAfterReceiving}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <Typography>
      Longest stay without receiving photo: {photoStats2.longestWithoutReceiving.duration} days
    </Typography>
    <IconGrid
      traitData={photoStats2.longestWithoutReceiving}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <BreakdownLink onClick={() => {setShowPhotoDialog(true);}} />
    <Divider>
      <Chip label="Contemporaries" color="secondary" />
    </Divider>
    <Typography>
      Most contemporary villagers: {contemporariesData[0].trait}
    </Typography>
    <IconGrid
      traitData={contemporariesData[0]}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
    />
    <Typography>
      Fewest contemporary villagers: {contemporariesData[contemporariesData.length - 1].trait}
    </Typography>
    <IconGrid
      traitData={contemporariesData[contemporariesData.length - 1]}
      villagersData={villagersData}
      mediumScreen={mediumScreen}
      setDialogVillager={setDialogVillager}
      setShowVillagerDialog={setShowVillagerDialog}
      />
    <BreakdownLink onClick={() => {setShowContemporariesDialog(true);}} />
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
                  <VillagerIcon
                    villager={villager}
                    villagersData={villagersData}
                    mediumScreen={mediumScreen}
                    setDialogVillager={setDialogVillager}
                    setShowVillagerDialog={setShowVillagerDialog}
                  />
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
          <Divider>
            <Chip label={`${traitData.trait}: ${traitData.count}`} color="secondary" />
          </Divider>
          <IconGrid
            traitData={traitData}
            villagersData={villagersData}
            mediumScreen={mediumScreen}
            setDialogVillager={setDialogVillager}
            setShowVillagerDialog={setShowVillagerDialog}
          />
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
                  <VillagerIcon
                    villager={villager}
                    villagersData={villagersData}
                    mediumScreen={mediumScreen}
                    setDialogVillager={setDialogVillager}
                    setShowVillagerDialog={setShowVillagerDialog}
                  />
                  <Typography>
                    &nbsp;&nbsp;{photo.trait} days
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={showContemporariesDialog}
      onClose={() => setShowContemporariesDialog(false)}
      maxWidth={false}
      keepMounted
      zIndex={1200}
    >
      <DialogContent>
        <List>
          {contemporariesData.map((contemps) => (
            contemps.villagers.map((villager) => (
              <ListItem key={villager} disablePadding>
                <Box display="flex" alignItems="center">
                  <VillagerIcon
                    villager={villager}
                    villagersData={villagersData}
                    mediumScreen={mediumScreen}
                    setDialogVillager={setDialogVillager}
                    setShowVillagerDialog={setShowVillagerDialog}
                  />
                  <Typography>
                    &nbsp;&nbsp;{contemps.trait} contemporaries
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </CustomDialog>
  </>

}