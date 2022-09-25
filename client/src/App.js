import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateRecipe from './components/RecipeCreate'
import Details from './components/Details'


function App() {
  return (


    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/recipes/:id' component={Details} />
          <Route exact path='/recipe' component={CreateRecipe} />
        </Switch>
      </div>
    </BrowserRouter>


    // <div className="App">
    //   <h1>Henry Food </h1>
    // </div>
  );
}

export default App;
