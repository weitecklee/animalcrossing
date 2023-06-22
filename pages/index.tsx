import History from '../components/history';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { HistoryProperties, VillagerProperties2 } from '../types';
import TopBar from '../components/topBar';

export default function HomePage({APIdata, HistoryData}: {APIdata : VillagerProperties2[], HistoryData: HistoryProperties[]}) {

  const [villagersData, setVillagersData] = useState<Map<string, VillagerProperties2>>(new Map());
  const [history, setHistory] = useState<HistoryProperties[]>([]);

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
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <TopBar />
    <History villagersData={villagersData} history={history} />
  </>)
}

export async function getStaticProps(): Promise<{
  props: {
      APIdata: VillagerProperties2[];
      HistoryData: HistoryProperties[];
  };
}> {
  const res = await fetch(`https://api.nookipedia.com/villagers?game=nh&nhdetails=true`, {
    method: 'GET',
    headers: {
      'X-API-KEY': `${process.env.nookipedia_api_key}`,
      'Content-Type': 'application/json',
      'Accept-Version': '1.0.0',
    },
  });
  const APIdata = await res.json();

  const payload = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'history',
    filter: {},
  }

  const res2 = await fetch(`${process.env.api_url}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.api_key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  const mongoData = await res2.json();
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