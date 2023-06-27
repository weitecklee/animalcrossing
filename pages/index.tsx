import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic'
import { MongoProperties, HistoryProperties, TimelineDataProperties } from '../types';
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

export default function HomePage({ mongoData, timelineData}: { mongoData: MongoProperties[], timelineData: TimelineDataProperties }) {

  const [histories, setHistories] = useState<Map<string,HistoryProperties>>(new Map());
  const [component, setComponent] =  useState('Index');

  useEffect(() => {
    const tmp: Map<string,HistoryProperties> = new Map();

    for (const mongoDatum of mongoData) {
      const tmpHist: HistoryProperties = {
        ... mongoDatum
      } as HistoryProperties;
      tmpHist.startDateDate = new Date(mongoDatum.startDate);
      if (!mongoDatum.endDate) {
        tmpHist.endDateDate = new Date();
        tmpHist.endDateDate.setHours(0, 0, 0);
      } else {
        tmpHist.endDateDate = new Date(mongoDatum.endDate);
      }
      if (mongoDatum.photo) {
        tmpHist.photoDateDate = new Date(mongoDatum.photoDate);
      }
      tmpHist.endDateString = tmpHist.endDateDate.toLocaleDateString("fr-CA");
      tmpHist.duration = Math.round((tmpHist.endDateDate.getTime() - tmpHist.startDateDate.getTime()) / (1000 * 3600 * 24)) + 1;
      tmp.set(tmpHist.name, tmpHist);
    }

    setHistories(tmp);

  }, [mongoData])

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
    mongoData: MongoProperties[],
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

  const mongoResponse = await res.json();
  const mongoData = mongoResponse.documents;

  const labels: string[] = [];
  const timeData: string[][] = [];
  const backgroundColor: string[] = [];

  for (const mongoDatum of mongoData) {
    const startDate = new Date(mongoDatum.startDate);
    let endDate: Date;
    if (!mongoDatum.endDate) {
      mongoDatum.currentResident = true;
      endDate = new Date();
      endDate.setHours(0, 0, 0);
    } else {
      mongoDatum.currentResident = false;
      endDate = new Date(mongoDatum.endDate);
    }
    if (mongoDatum.photoDate) {
      mongoDatum.photo = true
      mongoDatum.photoDateString = new Date(mongoDatum.photoDate).toLocaleDateString("fr-CA");
    } else {
      mongoDatum.photo = false;
    }
    mongoDatum.startDateString = startDate.toLocaleDateString("fr-CA");
    labels.push(mongoDatum.name);
    timeData.push([mongoDatum.startDateString, endDate.toLocaleDateString("fr-CA")])
    backgroundColor.push('#' + villagersData.get(mongoDatum.name)?.title_color!)
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
      mongoData,
      timelineData,
    }
  }
}

export const metadata = {
  title: 'My Animal Crossing Island',
}