import React from 'react';
import API from '../service/api';

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
                        <nav className="navbar navbar-expand-sm bg-dark">
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

                        <div className="text-center" >
                            <h1>Listado de Ventas</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Ventas;