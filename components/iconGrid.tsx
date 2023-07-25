import { Grid } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { TraitProperties, VillagerProperties2 } from '../types';
import VillagerIcon from './villagerIcon';

export default function IconGrid({ traitData, villagers, villagersData, mediumScreen, setDialogVillager, setShowVillagerDialog, customOnClick } : {
  traitData?: TraitProperties,
  villagers?: string[],
  villagersData: Map<string,VillagerProperties2>,
  mediumScreen: boolean,
  setDialogVillager: Dispatch<SetStateAction<string>>,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
  customOnClick?: () => void,
}) {

  if (!!traitData) {
    return (
      <Grid container>
        {traitData.villagers.map((villager) =>
          <Grid key={villager}
            item
          >
            <VillagerIcon
              villager={villager}
              villagersData={villagersData}
              mediumScreen={mediumScreen}
              setDialogVillager={setDialogVillager}
              setShowVillagerDialog={setShowVillagerDialog}
              customOnClick={customOnClick}
            />
          </Grid>
        )}
      </Grid>
    )
  }
  return (
    <Grid container>
      {villagers!.map((villager) =>
        <Grid key={villager}
          item
        >
          <VillagerIcon
            villager={villager}
            villagersData={villagersData}
            mediumScreen={mediumScreen}
            setDialogVillager={setDialogVillager}
            setShowVillagerDialog={setShowVillagerDialog}
            customOnClick={customOnClick}
          />
        </Grid>
      )}
    </Grid>
  )

}