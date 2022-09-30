import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import LandingPage  from './components/LandingPage/LandingPage.jsx'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Route exact path={'/'} component={LandingPage}/>
      <Route path={'/Home'} component={Home}/>
      <Route path={'/detail/:id'} component={PokemonDetail} />
      <Route path={'/createPokemon'} component={Form} />
    </div>
  );
}

export default App;
