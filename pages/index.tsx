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

export default function HomePage({ historyData}: { historyData: HistoryProperties[]}) {

  const [histories, setHistories] = useState<Map<string,HistoryProperties>>(new Map());
  const [component, setComponent] =  useState('Index');
  const [timelineData, setTimelineData] = useState<TimelineDataProperties>({} as TimelineDataProperties);

  useEffect(() => {
    const tmp: Map<string,HistoryProperties> = new Map();
    const labels: string[] = [];
    const timeData: string[][] = [];

    for (const hist of historyData) {
      hist.startDate = new Date(hist.startDate);
      if (!hist.endDate) {
        hist.currentResident = true;
        hist.endDate = new Date();
      } else {
        hist.currentResident = false;
        hist.endDate = new Date(hist.endDate);
      }
      tmp.set(hist.name, hist);
      labels.push(hist.name);
      timeData.push([hist.startDate.toLocaleDateString("fr-CA"), hist.endDate.toLocaleDateString("fr-CA")])
    }

    // documents?.sort((a, b) => {
    //   if (a.startDate < b.startDate) {
    //     return -1;
    //   } else if (a.startDate > b.startDate) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });

    const tmpTimelineData = {
      labels,
      datasets: [
        {
          label: 'Villagers',
          data: timeData,
        }
      ]
    }

    setHistories(tmp);
    setTimelineData(tmpTimelineData);

  }, [historyData])

  return (<>
    <Head>
      <title>My Animal Crossing Island</title>
    </Head>
    <ThemeProvider theme={theme}>
      <TopBar setComponent={setComponent} />
      {component === 'Index' && <IndexComponent />}
      {component === 'Villagers' && <Cards villagersData={villagersData} histories={histories} />}
      {component === 'Timeline' && <Timeline timelineData={timelineData} />}
    </ThemeProvider>
  </>)
}

export async function getStaticProps(): Promise<{
  props: {
    historyData: HistoryProperties[];
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

  return {
    props: {
      historyData
    }
  }
}

export const metadata = {
  title: 'My Animal Crossing Island',
}