import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const dateFormat = {
  month: "2-digit",
  year: "numeric",
  day: "2-digit"
};

export default function HistoryCard({history}) {
  return (
    <Paper elevation={2}>
      <Box padding={1}>
        <Stack>
          <Typography>
            {history.name}
          </Typography>
          <Typography>
            {history.startDate.toLocaleDateString("en-ZA")}
          </Typography>
          <Typography>
            {history.endDate ? history.endDate.toLocaleDateString("en-ZA") : 'Present'}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}