import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import HistoryCard from './historyCard';

interface HistoryProperties {
  name: string,
  startDate: Date,
  endDate: Date | string,
  _id: string,
}

export default function History() {

  const [history, setHistory] = useState<HistoryProperties[]>([]);

  useEffect(() => {
    fetch('/api/db')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const documents: HistoryProperties[] = data.documents.map((document: HistoryProperties) => {
          document.startDate = new Date(document.startDate);
          document.endDate = document.endDate ? new Date(document.endDate) : '';
          return document;
        })

        documents.sort((a, b) => {
          if (a.startDate < b.startDate) {
            return -1;
          } else if (a.startDate > b.startDate) {
            return 1;
          } else {
            return 0;
          }
        });
        setHistory(documents);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return <Grid container spacing={2}>
    {history.map((villager) =>
      <Grid
        item
        key={villager.name}
      >
        <HistoryCard
          history={villager}
        />
      </Grid>
    )}
  </Grid>
}