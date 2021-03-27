import { useEffect, useState } from 'react';
import { NewsList } from '../news-list/NewsList';
import s from './News.module.scss';

const url = process.env.REACT_APP_API_URL;
// frettasida
export function News() {
  const [data, setData ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {        
    async function fetchData() {
      await fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
          setData(data)
        })
        .catch(error => {
            console.error("error fetching data")
            setError(error);
        })
        .finally(() => {
            setLoading(false)
        })
    }
    fetchData()
  }, [])

  if (error) return 'error';
  if (loading) return 'loading...';

  if (data) {
    const news = [];
    for (let i = 0; i < data.length; i++) {
      news.push(<NewsList id={data[i].id} partial={true}/>)
    }
    return (
      <div className={s.news}>{news}</div>
    )
  }
}