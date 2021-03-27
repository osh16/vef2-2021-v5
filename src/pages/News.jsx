import { useEffect, useState } from 'react';
import { NewsList } from '../components/news-list/NewsList'

const url = process.env.REACT_APP_API_URL;
export function NewsPage() {
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
      news.push(<NewsList id={data[i].id} title={data[i].title} url={data[i].url}/>)
    }
    return (
      <ul>{news}</ul>
    )
  }
}