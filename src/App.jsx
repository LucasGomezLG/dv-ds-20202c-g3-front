import React from 'react';
import './App.css';
import Clientes from './components/clientes/Clientes';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Prendas from './components/prendas/Prendas';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/prendas" render={(props) => <Prendas {...props} />} />
        <Route path="/clientes" render={(props) => <Clientes {...props} />} />

      </Switch>
    </BrowserRouter>


  );
}

export default App;
