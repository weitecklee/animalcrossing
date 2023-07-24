
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { VillagerProperties2 } from '../types';

export default function VillagerIcon({ villager, villagersData, mediumScreen, setDialogVillager, setShowVillagerDialog, customOnClick } : {
  villager: string,
  villagersData: Map<string,VillagerProperties2>,
  mediumScreen: boolean,
  setDialogVillager: Dispatch<SetStateAction<string>>,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
  customOnClick?: Dispatch<SetStateAction<boolean>>,
}) {

  const theme = useTheme();

  return (
    <Image
      src={villagersData.get(villager)?.nh_details.icon_url!}
      alt={villager}
      height={mediumScreen ? 40 : 64}
      width={mediumScreen ? 40 : 64}
      title={villager}
      onClick={() => {
        if (customOnClick) {
          customOnClick(false);
          setTimeout(() => {
            setDialogVillager(villager);
            customOnClick(true);
          }, theme.transitions.duration.standard);
        } else {
          setDialogVillager(villager);
          setShowVillagerDialog(true);
        }
      }}
      style={{
        cursor: 'pointer',
      }}
    />
  );

}