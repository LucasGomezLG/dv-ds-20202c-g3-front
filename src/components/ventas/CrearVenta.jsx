import React from 'react';
import API from '../service/api';
import './style.css';
import Button from '@material-ui/core/Button';


class CrearVenta extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount(){
        API.get('tienda/api/ventas/all').then((res) => console.log(res))
      .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="container-fluid">
                        <nav id="navegador" className="navbar navbar-expand-sm bg-dark">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="../prendas">Prendas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="../clientes">Clientes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="../ventas">Ventas</a>
                                </li>
                            </ul>
                        </nav>

                        <div className="text-center nov" >
                            <h1>Comprar</h1>
                        </div>
                    </div>
                </div>
             {this.formulario()}

            </div>
        )
    }

    formulario(){
        return (
<div>
    <div className="container">
        <div className="row">
            <form className='formulario'>

            <label>
                Nombre Cliente
                    <input className="cuadro1" type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
        
    <Button variant="contained" color="primary" className="ml-5" >
             Buscar Cliente
        </Button>

        <br></br>

            <label>
          Tipo Venta
          <select className="cuadro2" value={this.state.value} onChange={this.handleChange}>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </label>

        <br></br>

            <label>
          Cantidad de Cuotas
          <input
            className="cuadro3"
            name="cantCuotas"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />

        </label>





            </form>
        </div>
    </div>
 </div>
        )
    }
}

export default CrearVenta;