import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;
// yfirlit frettaflokka
export function NewsList({id, partial}) {
  const [data, setData ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (id == null) {                    
    id = (window.location.pathname).substr(1,) // sma hack
  }
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
  if (error) return 'error: ';
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
        let link = data.items[i].link
        let title = data.items[i].title
        news.push(<li key={title.substr(0,5).replace(' ','-')}><a href={data.items[i].link}>{data.items[i].title}</a></li>);
      }
    }
    return (
      <div id={id}>
        <h2>{header}</h2>
        <ul>{news}</ul>
        <p> {
          partial ? 
          <Link to={id}>Allar frettir</Link> :
          <Link to='/'>Til baka</Link>
        } </p>
      </div>
    )
  }
}
