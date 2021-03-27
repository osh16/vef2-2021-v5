import { Layout } from './components/layout/Layout';
import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

import React, { useEffect, useState } from 'react';

export default function App() {
  return (
    //<Layout>
      <NewsPage/>
    //</Layout>
  )
}
