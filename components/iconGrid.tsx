import { Grid } from '@mui/material';
import { TraitProperties } from '../types';
import VillagerIcon from './villagerIcon';

export default function IconGrid({ traitData, villagers, mediumScreen, customOnClick } : {
  traitData?: TraitProperties,
  villagers?: string[],
  mediumScreen: boolean,
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
              mediumScreen={mediumScreen}
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
            mediumScreen={mediumScreen}
            customOnClick={customOnClick}
          />
        </Grid>
      )}
    </Grid>
  )

}