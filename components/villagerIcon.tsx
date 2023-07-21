
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { VillagerProperties2 } from '../types';

export default function VillagerIcon({ villager, villagersData, mediumScreen, setDialogVillager, setShowVillagerDialog } : {
  villager: string,
  villagersData: Map<string,VillagerProperties2>,
  mediumScreen: boolean,
  setDialogVillager: Dispatch<SetStateAction<string>>,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
}) {

  return (
    <Image
      src={villagersData.get(villager)?.nh_details.icon_url!}
      alt={villager}
      height={mediumScreen ? 40 : 64}
      width={mediumScreen ? 40 : 64}
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

}