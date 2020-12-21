import React from 'react';
import API from '../service/api';
import './style.css';
import Button from '@material-ui/core/Button';


class Ventas extends React.Component {

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
                            <h1>Listado de Ventas</h1>
                        </div>
                    </div>
                </div>
                <div  id='boton' className="col-sm-6 bloque"> 
                    <Button variant="contained" color="primary" className="ml-5" onClick={() => this.handleRoute()} >
                    Comprar
                    </Button>
                </div>
              
            </div>
        )
    }
    handleRoute(){
       this.props.history.push({
           pathname:'/crearventas'
       })
    }
        
    }


export default Ventas;