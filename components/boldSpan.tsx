import { Box } from '@mui/material';

export default function BoldSpan({ text }: { text: string }) {
  return (
    <Box component="span" sx={{ fontFamily: 'Coustard' }}>
      {text}
    </Box>
  );
}
