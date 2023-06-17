import { useState, useEffect } from 'react';

interface HistoryProperties {
  name: string,
  startDate: Date,
  endDate: Date,
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
        const documents: HistoryProperties[] = data.documents;
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

  return <>
    {history.map((villager) =>
      <p key={villager.name}>
        {villager.name}
      </p>
    )}
  </>
}