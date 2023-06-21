import History from './history';
import { useState, useEffect } from 'react';
import { VillagerProperties } from '../types';

export default function HomePage({APIdata}) {

  const [villagersData, setVillagersData] = useState<Map<string, VillagerProperties>>(new Map());

  useEffect(() => {
    const vData: Map<string, VillagerProperties> = new Map();
    const tmp: VillagerProperties[] = Object.values(APIdata);

    for (const val of tmp) {
      vData.set(val.name["name-USen"], val);
    }

    setVillagersData(vData);

  }, [APIdata]);

  return (<>
    <div>Animal Crossing!</div>
    <History villagersData={villagersData}/>
  </>)
}

export async function getStaticProps() {
  const res = await fetch('http://acnhapi.com/v1/villagers');
  const APIdata = await res.json();

  return {
    props: {
      APIdata,
    }
  }
}