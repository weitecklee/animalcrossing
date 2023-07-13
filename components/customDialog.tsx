import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Dialog, Fab, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CustomDialogProps } from '../types';

export default function CustomDialog({zIndex, ...props}: CustomDialogProps) {

  const { open, onClose } = props;
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return <>
    <Dialog
      {...props}
      sx={{
        zIndex,
      }}
    />
    <Box
      display={smallScreen ? (open ? "flex" : "none") : "none"}
      position="fixed"
      width="100%"
      justifyContent="center"
      left={0}
      bottom={8}
      zIndex={zIndex + 1}
      onClick={() => onClose!({}, "escapeKeyDown")}
    >
      <Box >
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
    </Box>
  </>
}