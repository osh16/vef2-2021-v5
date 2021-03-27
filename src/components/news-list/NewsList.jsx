import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { Route } from 'react-router';
import s from "./NewsList.module.scss"

const url = process.env.REACT_APP_API_URL;
// yfirlit frettaflokka
export function NewsList({id, partial}) {
  const [data, setData ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  if (id == null) {                    
    id = (window.location.pathname).substr(1,) // sma hack
  }
  useEffect(() => {        
    async function fetchData() {
      await fetch(url + id)
        .then(response => {
            if (response.status === 404) {
              setStatus('404');
            }
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
            setError(true);
        })
        .finally(() => {
            setLoading(false)
        })
    }
    fetchData()
  }, [])
  // skitaredding
  if (status) return <div className={s.newslist}><Route component={NotFound}/></div>
  if (error) return <div className={s.newslist}><p>Villa kom upp</p></div>
  if (loading) return <div className={s.newslist}><p>Loading...</p></div>
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
      <div className={s.newslist} id={id}>
        <h2>{header}</h2>
        <ul>{news}</ul>
        <p className={s.newslist__link}> {
          partial ? 
          <Link to={id}>Allar frettir</Link> :
          <Link to='/'>Til baka</Link>
        } </p>
      </div>
    )
  }
}
