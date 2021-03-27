import { useEffect, useState } from 'react';
import { NewsList } from '../components/news-list/NewsList'

// frettasida
export function NewsPage({id}) {
  return (
    <NewsList id={id} partial={false}/>
  )
}