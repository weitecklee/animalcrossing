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
import Box, { BoxProps } from '@mui/material/Box';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { TimelineDataProperties, VillagerProperties2 } from '../types';
import TimelineTooltip from './timelineTooltip';

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
        x: { min: 'original', max: 'original', minRange: 86400000 },
        y: { min: 'original', max: 'original' },
      },
      pan: { enabled: true, mode: 'xy', threshold: 10 },
      zoom: {
        mode: 'xy',
        wheel: {
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
        minUnit: 'day',
        displayFormats: {
          day: 'MMM d yyyy',
        },
      },
      grid: {
        display: false,
      }
    },
    y: {
      display: false,
    }
  }
} as any;

export default function Timeline({ timelineData, villagersData }: { timelineData: TimelineDataProperties, villagersData: Map<string,VillagerProperties2> }) {

  const [timelineChart, setTimelineChart] = useState({} as any);
  const [timelineTooltip, setTimelineTooltip] = useState({} as any);
  const [timelineVillager, setTimelineVillager] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  options.plugins.tooltip.external = ({ chart, tooltip }) => {
    const a = {...chart};
    const b = {...tooltip};
    setTimelineVillager(b.title[0]);
    setTimelineChart(a);
    setTimelineTooltip(b);
    setShowTooltip(true);
  }

  return <Box sx={{
    position: "relative",
    margin: "auto",
    width: "90vw",
    height: "90vh",
  }}>
      <Bar
        data={timelineData}
        options={options}
      />
      {showTooltip &&
        <TimelineTooltip
          chart={timelineChart}
          tooltip={timelineTooltip}
          villagerData={villagersData.get(timelineVillager)!}
        />
      }
  </Box>
}