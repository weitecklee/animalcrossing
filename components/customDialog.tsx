import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Dialog, Fab } from '@mui/material';
import { useContext } from 'react';
import { ScreenContext } from '../pages';
import { CustomDialogProps } from '../types';

export default function CustomDialog({zIndex, ...props}: CustomDialogProps) {

  const { open, onClose } = props;
  const mediumScreen = useContext(ScreenContext);

  return <>
    <Dialog
      {...props}
      sx={{
        zIndex,
      }}
    />
    <Box
      display={mediumScreen ? (open ? "flex" : "none") : "none"}
      position="fixed"
      width="100%"
      justifyContent="center"
      left={0}
      bottom={8}
      zIndex={zIndex + 2}
      onClick={() => onClose!({}, "escapeKeyDown")}
    >
      <Fab
        size="small"
        color="secondary"
        sx={{
          ':hover': {
            bgcolor: "white"
          },
        }}
        onClick={() => onClose!({}, "escapeKeyDown")}
      >
        <CloseRoundedIcon />
      </Fab>
    </Box>
  </>
}