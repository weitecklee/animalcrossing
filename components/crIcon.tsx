import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { ScreenContext } from '../pages';

export default function CRIcon() {
  const { mediumScreen } = useContext(ScreenContext);
  const theme = useTheme();

  if (mediumScreen) {
    return (
      <Box
        bgcolor={theme.palette.secondary.main}
        component="span"
        sx={{
          borderRadius: Number.MAX_SAFE_INTEGER,
          border: '1px solid black',
          height: '10px',
          width: '10px',
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
      />
    );
  }

  return (
    <Box
      bgcolor={theme.palette.secondary.main}
      component="span"
      sx={{
        px: 1,
        borderRadius: Number.MAX_SAFE_INTEGER,
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
      }}
      title="Current Resident"
    >
      <Typography component="span" variant="body2" fontFamily="Coustard">
        CR
      </Typography>
    </Box>
  );
}
