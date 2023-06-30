import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Zoom from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { VillagerProperties2, HistoryProperties } from '../types';
import TimelineTooltip from './timelineTooltip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ViewTimelineRoundedIcon from '@mui/icons-material/ViewTimelineRounded';
import Fab from '@mui/material/Fab';
import VillagerDialog from './villagerDialog';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale,
  Zoom,
);

const options = {
  indexAxis: 'y' as const ,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 1,
      borderSkipped: false,
      borderColor: '#000',
      borderRadius: Number.MAX_VALUE,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    zoom: {
      limits: {
        x: { min: 'original', max: 'original', minRange: 86400000 * 365 },
        y: { min: 'original', max: 'original', minRange: 20 },
      },
      pan: { enabled: true, mode: 'xy', threshold: 10 },
      zoom: {
        mode: 'xy',
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      type: 'time',
      min: new Date('2020/03/26').valueOf() - 86400000,
      max: new Date().valueOf() + 86400000,
      time: {
        minUnit: 'month',
        displayFormats: {
          day: 'MMM d yyyy',
        },
      },
    },
    y: {
      display: false,
    }
  }
} as any;

const options2 = JSON.parse(JSON.stringify(options));
options2.plugins.zoom.limits = {
  x: { min: 'original', max: 'original', minRange: 30 },
  y: { min: 'original', max: 'original', minRange: 20 },
};

export default function Timeline({ timelineData, timelineData2, villagersData, histories, timelineLabels, timelineColors, timelineData3, timelineLabels3, timelineColors3 }: {
  timelineData: string[][],
  timelineData2: number[],
  villagersData: Map<string,VillagerProperties2>,
  histories: Map<string,HistoryProperties> ,
  timelineLabels: string[],
  timelineColors: string[],
  timelineData3: number[],
  timelineLabels3: string[],
  timelineColors3: string[],
}) {

  const [timelineVillager, setTimelineVillager] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const shortScreen = useMediaQuery('(max-height:700px)')
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [showDialog, setShowDialog] = useState(false);
  const [timelineMode, setTimelineMode] = useState(0);
  const [barData, setBarData] = useState<string[][] | number[]>(timelineData);
  const [barLabels, setBarLabels] = useState(timelineLabels);
  const [barColors, setBarColors] = useState(timelineColors);

  useEffect(() => {
    options.plugins.tooltip.external = ({ tooltip }) => {
      if (tooltip && tooltip.title) {
        setTimelineVillager(tooltip.title[0]);
        setShowTooltip(true);
      }
    };
    options2.plugins.tooltip.external = options.plugins.tooltip.external;
    options2.scales.x = {
      min: 0,
      max: Math.max(... timelineData2),
    };
  }, [timelineData2]);

  const [barOptions, setBarOptions] = useState(options);

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  useEffect(() => {
    setOpenSnackbar(smallScreen);
  }, [smallScreen]);

  useEffect(() => {
    if (timelineMode === 0) {
      setBarOptions(options);
      setBarData(timelineData);
      setBarColors(timelineColors);
      setBarLabels(timelineLabels);
    } else if (timelineMode === 1) {
      setBarOptions(options2);
      setBarData(timelineData2);
      setBarColors(timelineColors);
      setBarLabels(timelineLabels);
    } else if (timelineMode === 2) {
      setBarOptions(options2);
      setBarData(timelineData3);
      setBarColors(timelineColors3);
      setBarLabels(timelineLabels3);
    }

  }, [timelineMode, timelineData, timelineData2, timelineData3, timelineColors, timelineColors3, timelineLabels, timelineLabels3]);

  return <Box sx={{
    position: "relative",
    margin: "auto",
    width: "90vw",
    height: shortScreen ? "80vh" : "90vh",
  }}>
    <Snackbar
      open={openSnackbar}
      onClose={handleClose}
    >
      <Alert
        severity="warning"
        onClose={handleClose}
        sx={{
          width: "100%"
        }}
      >
        This page is best viewed on a large screen.
      </Alert>
    </Snackbar>
    <Bar
      data={{
        labels: barLabels,
        datasets: [
          {
            label: 'Villagers',
            data: barData,
            backgroundColor: barColors,
          }
        ]
      }}
      options={barOptions}
    />
    {showTooltip &&
      <TimelineTooltip
        villagerData={villagersData.get(timelineVillager)!}
        history={histories.get(timelineVillager)!}
        setShowDialog={setShowDialog}
      />
    }
    <VillagerDialog
      history={histories.get(timelineVillager)!}
      villagerData={villagersData.get(timelineVillager)!}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
    />
    <Fab
      color="secondary"
      onClick={() => {
        setTimelineMode((mode) => mode === 2 ? 0 : (mode + 1));
      }}
      sx={{
        position: "fixed",
        right: "1%",
        bottom: "1%",
        ':hover': {
          bgcolor: "white"
        },
        display: {
          xs: 'flex',
          md: 'none',
        },
      }}>
      <ViewTimelineRoundedIcon />
    </Fab>
    <Fab
      color="secondary"
      variant="extended"
      onClick={() => {
        setTimelineMode((mode) => mode === 2 ? 0 : (mode + 1));
      }}
      sx={{
        position: "fixed",
        right: "1%",
        bottom: "1%",
        ':hover': {
          bgcolor: "white"
        },
        display: {
          xs: 'none',
          md: 'flex',
        },
      }}>
      <ViewTimelineRoundedIcon sx={{mr: 1}} />
      Change view
    </Fab>
  </Box>
}