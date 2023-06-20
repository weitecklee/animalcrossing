import History from './history';
import { useState, useEffect } from 'react';
import { VillagerProperties } from './interfaces';

function HomePage() {

  const [villagersData, setVillagersData] = useState<Map<string, VillagerProperties>>(new Map());

  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const tmp: Map<string, VillagerProperties> = new Map();
        const tmp2: VillagerProperties[] = Object.values(data);
        for (const val of tmp2) {
          tmp.set(val.name["name-USen"], val);
        }
        setVillagersData(tmp);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (<>
    <div>Animal Crossing!</div>
    <History villagersData={villagersData}/>
  </>)
}

export default HomePage