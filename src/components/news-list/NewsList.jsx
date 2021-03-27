import React, { useEffect, useState } from 'react';

// yfirlit frettaflokka
export function NewsList({id, title, url}) {
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
    for (let i = 0; i < data.items.length; i++) {
      news.push(<li><a href={data.items[i].link}>{data.items[i].title}</a></li>);
      //news[i] = { id : data.items[i].id, title : data.items[i].title, link : data.items[i].link }
      //console.log(data.items[i])
    }
    return (
      <div id={id}>
        <h2>{title}</h2>
        <p>{news}</p>
        <p>til baka</p>
      </div>
    )
  }
}
