import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HistoryProperties, VillagerProperties2 } from '../types';
import TopBar from '../components/topBar';
import IndexComponent from '../components/indexComponent';
import Cards from '../components/cards';
import Timeline from '../components/timeline';

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

export default function HomePage({APIdata, HistoryData}: {APIdata : VillagerProperties2[], HistoryData: HistoryProperties[]}) {

  const [villagersData, setVillagersData] = useState<Map<string, VillagerProperties2>>(new Map());
  const [history, setHistory] = useState<HistoryProperties[]>([]);
  const [component, setComponent] =  useState('Index');

  useEffect(() => {
    const vData: Map<string, VillagerProperties2> = new Map();
    for (const v of APIdata) {
      vData.set(v.name, v);
    }
    setVillagersData(vData);
  }, [APIdata]);

  useEffect(() => {
    const documents: HistoryProperties[] = HistoryData?.map((document: HistoryProperties) => {
      document.startDate = new Date(document.startDate);
      if (!document.endDate) {
        document.currentResident = true;
        document.endDate = new Date();
      } else {
        document.currentResident = false;
        document.endDate = new Date(document.endDate);
      }
      return document;
    })

    documents?.sort((a, b) => {
      if (a.startDate < b.startDate) {
        return -1;
      } else if (a.startDate > b.startDate) {
        return 1;
      } else {
        return 0;
      }
    });

    setHistory(documents);

  }, [HistoryData])

  return (<>
    <Head>
      <title>My Animal Crossing Island</title>
    </Head>
    <ThemeProvider theme={theme}>
      <TopBar setComponent={setComponent} />
      {component === 'Index' ? <IndexComponent /> : ""}
      {component === 'Cards' ?
        <Cards villagersData={villagersData} history={history} />
      : ""}
      {component === 'Timeline' ? <Timeline /> : ""}
    </ThemeProvider>
  </>)
}

async function getAPIdata() {
  const res = await fetch(`https://api.nookipedia.com/villagers?game=nh&nhdetails=true`, {
    method: 'GET',
    headers: {
      'X-API-KEY': `${process.env.nookipedia_api_key}`,
      'Content-Type': 'application/json',
      'Accept-Version': '1.0.0',
    },
  });
  return res.json();
}

async function getMongoData() {
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
  return res.json();
}

export async function getStaticProps(): Promise<{
  props: {
      APIdata: VillagerProperties2[];
      HistoryData: HistoryProperties[];
  };
}> {

  const [APIdata, mongoData] = await Promise.all([getAPIdata(), getMongoData()]);
  const HistoryData = mongoData.documents;

  return {
    props: {
      APIdata,
      HistoryData
    }
  }
}

export const metadata = {
  title: 'Animal Crossing',
}