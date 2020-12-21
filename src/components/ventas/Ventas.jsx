import React from 'react';
import API from '../service/api';
import './style.css';
import Button from '@material-ui/core/Button';


class Ventas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ventas: [],
        }
    }

    componentDidMount() {
        API.get('tienda/api/ventas/all').then((res) => this.setState({ ventas: res }))
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
                            <h1>Listado de Ventas</h1>
                        </div>
                        
                    </div>
                </div>
                <div  id='boton' className="col-sm-6 bloque"> 
                    <Button variant="contained" color="primary" className="ml-5" onClick={() => this.handleRoute()} >
                    Comprar
                    </Button>
                </div>
                <div className="bloque">
               {this.renderList()}
               </div>
            </div>
               
        )
    }
    handleRoute(){
       this.props.history.push({
           pathname:'/crearventas'
       })
    }

    renderList() {
        return (
            <div>
                <table className="table container backList">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Prendas</th>
                            <th scope="col">Importe final</th>
                        </tr>
                    </thead>
                    {this.state.ventas.map((ventas) => this.transformarVentas(ventas))}
                </table>
            </div>
        )
    }

    transformarVentas(venta) {
        console.log(venta)
        return (
            <tbody key={venta.id}>
                <tr>
                    <th scope="row">{venta.id}</th>
                    <td>{venta.cliente.razonSocial}</td>
                    <td>{venta.fecha}</td>
                    <td>{venta.items.map((item) => item.cantidad)}</td>
                    <td>{venta.items.map((item) => item.prenda.descripcion)}</td>
                    <td>{venta.importeFinalStr}</td>
                </tr>
            </tbody>
        )
    }

}

export default Ventas;