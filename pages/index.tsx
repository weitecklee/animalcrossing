import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic'
import { HistoryProperties, TimelineDataProperties } from '../types';
import TopBar from '../components/topBar';
import IndexComponent from '../components/indexComponent';
import Cards from '../components/cards';
import { villagersData } from '../lib/combinedData';

const theme = createTheme({
  palette: {
    primary: {
      main: "#c48d3f",
    },
    secondary: {
      main: "#9dffb0",
    }
  },
  typography: {
    fontFamily: "Montserrat"
  }
});

const Timeline = dynamic(() => import('../components/timeline'), {ssr: false})

export default function HomePage({ historyData, timelineData}: { historyData: HistoryProperties[], timelineData: TimelineDataProperties }) {

  const [histories, setHistories] = useState<Map<string,HistoryProperties>>(new Map());
  const [component, setComponent] =  useState('Index');

  useEffect(() => {
    const tmp: Map<string,HistoryProperties> = new Map();

    for (const hist of historyData) {
      hist.startDate = new Date(hist.startDate);
      if (!hist.endDate) {
        hist.endDate = new Date();
        hist.endDate.setHours(0, 0, 0);
      } else {
        hist.endDate = new Date(hist.endDate);
      }
      tmp.set(hist.name, hist);
    }

    setHistories(tmp);

  }, [historyData])

  return (<>
    <Head>
      <title>My Animal Crossing Island</title>
    </Head>
    <ThemeProvider theme={theme}>
      <TopBar setComponent={setComponent} />
      {component === 'Index' && <IndexComponent />}
      {component === 'Villagers' && <Cards villagersData={villagersData} histories={histories} />}
      {component === 'Timeline' && <Timeline timelineData={timelineData} villagersData={villagersData} />}
    </ThemeProvider>
  </>)
}

export async function getStaticProps(): Promise<{
  props: {
    historyData: HistoryProperties[],
    timelineData: TimelineDataProperties,
  };
}> {

  const payload = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'history',
    filter: {},
  }

  const res = await fetch(`${process.env.api_url}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.api_key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const mongoData = await res.json();
  const historyData = mongoData.documents;

  const labels: string[] = [];
  const timeData: string[][] = [];
  const backgroundColor: string[] = [];

  for (const hist of historyData) {
    const startDate = new Date(hist.startDate);
    let endDate: Date;
    if (!hist.endDate) {
      hist.currentResident = true;
      endDate = new Date();
      endDate.setHours(0, 0, 0);
    } else {
      hist.currentResident = false;
      endDate = new Date(hist.endDate);
    }
    labels.push(hist.name);
    timeData.push([startDate.toLocaleDateString("fr-CA"), endDate.toLocaleDateString("fr-CA")])
    backgroundColor.push('#' + villagersData.get(hist.name)?.title_color!)
  }

  const timelineData = {
    labels,
    datasets: [
      {
        label: 'Villagers',
        data: timeData,
        backgroundColor,
      }
    ]
  }

  return {
    props: {
      historyData,
      timelineData,
    }
  }
}

export const metadata = {
  title: 'My Animal Crossing Island',
}