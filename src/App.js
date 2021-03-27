import { Route, Switch } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';


export default function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/:id" component={NewsPage}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </Layout>
  )
}
