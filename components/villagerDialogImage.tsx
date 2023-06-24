import { Dispatch, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { ButtonBase } from '@mui/material';

import { HistoryProperties, VillagerProperties2 } from '../types';

export default function VillagerDialogImage({history, villagerData, setShowDialog, setVillager}: {history: HistoryProperties, villagerData: VillagerProperties2 | undefined, setShowDialog: Dispatch<SetStateAction<boolean>>, setVillager: Dispatch<SetStateAction<string>>}) {

  const [hover, setHover] = useState(false);

  return (
    <ButtonBase
      onClick={() => {
        setVillager(history.name);
        setShowDialog(true);
      }}
    >
      <Image
        src={villagerData!.nh_details.photo_url}
        alt={history.name}
        width={150}
        height={150}
      />
    </ButtonBase>
  );
}