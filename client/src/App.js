import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path='/' exact />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
