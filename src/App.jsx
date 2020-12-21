import React from 'react';
import './App.css';
import Clientes from './components/clientes/Clientes';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Prendas from './components/prendas/Prendas';
import Ventas from './components/ventas/Ventas';
import CrearVentas from './components/ventas/CrearVenta';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/prendas" render={(props) => <Prendas {...props} />} />
        <Route path="/clientes" render={(props) => <Clientes {...props} />} />
        <Route path="/ventas" render={(props) => <Ventas {...props} />} />
        <Route path="/crearventas" render={(props) => <CrearVentas {...props} />} />

      </Switch>
    </BrowserRouter>


  );
}

export default App;
