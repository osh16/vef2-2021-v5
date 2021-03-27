import React, { useEffect, useState } from 'react';

const url = process.env.REACT_APP_API_URL;
// yfirlit frettaflokka
export function NewsList({id, partial}) {
  const [data, setData ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {        
    async function fetchData() {
      await fetch(url + id)
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
    const header = data.title;
    if (partial) {
      for (let i = 0; i < 5; i++) {
        news.push(<li><a href={data.items[i].link}>{data.items[i].title}</a></li>);
      }
    } else {
      for (let i = 0; i < data.items.length; i++) {
        news.push(<li><a href={data.items[i].link}>{data.items[i].title}</a></li>);
      }
    }
    return (
      <div id={id}>
        <h2>{header}</h2>
        <p>{news}</p>
        <p>{partial ? "Allar frettir" : "Til baka"}</p>
      </div>
    )
  }
}
