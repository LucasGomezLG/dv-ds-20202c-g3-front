import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import API from '../service/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
import Saco from '../../Img/Saco.webp';
import Pantalon from '../../Img/Pantalon.jpg';
import Campera from '../../Img/Campera.jpg';
import Camisa from '../../Img/Camisa.jpg';
import Chaqueta from '../../Img/Chaqueta.webp';
import Tapado from '../../Img/Tapado.jpg';
import './style.css'


class Prendas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      prendas: [],
      prendasFiltradas: [],
      idSet: '',
    }
  }


  componentDidMount() {

    API.get('tienda/api/prendas/all').then((res) => this.setState({ prendas: res, prendasFiltradas: res }))
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
              <h1>Listado de Prendas</h1>
            </div>
          </div>
        </div>
        <div className='row container bloque'>
          <div id="boton" className="col-sm-6">
            <Button variant="contained" color="primary" className="ml-5" onClick={() => this.agregarPrenda()}>
              Agregar</Button>
          </div>
          <div id="dropdown" className="col-sm-6 text-right" >
            {this.dropDown()}
          </div>

        </div>
        <div className="container">
          {this.renderizarPrendas()}
        </div>
      </div>
    )
  }

  renderizarPrendas() {
    return (
      <div className="row">
        {this.state.prendasFiltradas.map((prenda) => this.transformarPrendas(prenda))}
      </div>
    )
  }

  dropDown() {

    return (

      <Dropdown>
        <Dropdown.Toggle>
          Filtrar
      </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.todos()}>Todos</Dropdown.Item>
          <Dropdown.Item onClick={() => this.camisa()}>Camisa</Dropdown.Item>
          <Dropdown.Item onClick={() => this.pantalon()}>Pantalon</Dropdown.Item>
          <Dropdown.Item onClick={() => this.chaqueta()}>Chaqueta</Dropdown.Item>
          <Dropdown.Item onClick={() => this.tapado()}>Tapado</Dropdown.Item>
          <Dropdown.Item onClick={() => this.saco()}>Saco</Dropdown.Item>
          <Dropdown.Item onClick={() => this.campera()}>Campera</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    )

  }

  todos() {
    this.setState({ prendasFiltradas: this.state.prendas });
  }
  camisa() {
    this.setState({ prendasFiltradas: this.state.prendas.filter((prenda) => prenda.tipo === "CAMISA") });
  }
  pantalon() {
    this.setState({ prendasFiltradas: this.state.prendas.filter((prenda) => prenda.tipo === "PANTALON") });
  }
  chaqueta() {
    this.setState({ prendasFiltradas: this.state.prendas.filter((prenda) => prenda.tipo === "CHAQUETA") });
  }
  saco() {
    this.setState({ prendasFiltradas: this.state.prendas.filter((prenda) => prenda.tipo === "SACO") });
  }
  tapado() {
    this.setState({ prendasFiltradas: this.state.prendas.filter((prenda) => prenda.tipo === "TAPADO") });
  }
  campera() {
    this.setState({ prendasFiltradas: this.state.prendas.filter((prenda) => prenda.tipo === "CAMPERA") });
  }

  transformarPrendas(prenda) {


    return (

      <div className="col-sm-5 col-md-5 col-lg-3 mt-2" key={prenda.id}>
        <Card>
          <CardActionArea>
            <img src={this.imgPrendas(prenda.tipo)} alt="Foto" className="img-thumbnail" />
            <CardContent>
              <Typography variant="h5" component="h2">
                {prenda.tipo}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {prenda.descripcion}
              </Typography>
              <Typography>
                $ {prenda.precioBase}
              </Typography>
            </CardContent>
          </CardActionArea>
          <div className="row marginBottom">
            <div id="eliminar">
            <Button  variant="contained" color="secondary" className="ml-5" onClick={() => this.eliminarPrenda(prenda.id)}>
              Eliminar
              </Button>
              </div>
              <div>
            <Button  variant="contained" color="secondary" className="ml-5" onClick={() => this.editPrenda(prenda.id)}>
              Editar
              </Button>
              </div>
          </div>
        </Card>
      </div>

    );
  }

  eliminarPrenda(id) {
    API.postDos('tienda/api/prendas/delete/' + id)
      .then(() => this.componentDidMount())
      .catch((error) => console.log(error))
  }

  editPrenda(id) {

    this.setState({
      idSet: id
    })

    setTimeout(() => {
      this.edit(this.state);
    }, 150);

  }

  edit(state) {

    return (
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        width: 800,
        progressSteps: ['1', '2', '3', '4']
      }).queue([
        {
          title: 'Tipo de prenda',
          text: '',
          input: 'radio',
          inputOptions: {
            'CAMISA': 'CAMISA',
            'SACO': 'SACO',
            'PANTALON': 'PANTALON',
            'CAMPERA': 'CAMPERA',
            'TAPADO': 'TAPADO',
            'CHAQUETA': 'CHAQUETA',
          },
          inputValidator: (input) => {
            if (!input) {
              return 'Necesitas elegir una categoria!'
            }
          }
        },
        {
          title: 'Descripcion',
          text: '',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar una descripcion!'
            }
          }
        },
        {
          title: 'Precio',
          text: '',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar un precio!'
            }
          }
        }
      ]).then((result) => {
        if (result.value) {

          this.updatePrenda(result.value);

          Swal.fire({
            title: 'Prenda lista!',
            html: ` Tipo: ${result.value[0]}<br />
                Descripcion: ${result.value[1]}<br />
                Precio: ${result.value[2]} <br />                  
                `,
            confirmButtonText: 'Listo!'
          })
        }
      })
    )

  }

  updatePrenda(values) {
    const body = {
      precioBase: values[2],
      tipo: values[0],
      descripcion: values[1],
    }

    API.put('tienda/api/prendas/edit/' + this.state.idSet, body)
      .then(() => this.componentDidMount())
      .catch((error) => console.log(error))

  }

  agregarPrenda() {

    return (

      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        width: 800,
        progressSteps: ['1', '2', '3', '4']
      }).queue([
        {
          title: 'Tipo de Prenda',
          text: '',
          input: 'radio',
          inputOptions: {
            'CAMISA': 'CAMISA',
            'SACO': 'SACO',
            'PANTALON': 'PANTALON',
            'CAMPERA': 'CAMPERA',
            'TAPADO': 'TAPADO',
            'CHAQUETA': 'CHAQUETA',
          },
          inputValidator: (input) => {
            if (!input) {
              return 'Necesitas elegir una categoria!'
            }
          }
        },
        {
          title: 'Descripción',
          text: '',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar una descripción!'
            }
          }
        },
        {
          title: 'Precio',
          text: '',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar un precio!'
            }
          }
        }
      ]).then((result) => {
        if (result.value) {

          this.crearPrendaNuevo(result.value);

          Swal.fire({
            title: 'Prenda lista!',
            html: ` Tipo: ${result.value[0]}<br />
                Descripcion: ${result.value[1]}<br />
                Precio: ${result.value[2]} <br />                  
                `,
            confirmButtonText: 'Listo!'
          })
        }
      })

    )

  }

  crearPrendaNuevo(values) {

    const body = {
      precioBase: values[2],
      tipo: values[0],
      descripcion: values[1],
    }

    console.log(body)

    API.post('tienda/api/prenda/new', body)
      .then(() => this.componentDidMount())
      .catch((error) => console.log(error))


  }

  imgPrendas(tipo) {

    if (tipo === "SACO") {
      return Saco
    } if (tipo === "PANTALON") {
      return Pantalon
    } if (tipo === "CAMISA") {
      return Camisa
    } if (tipo === "CAMPERA") {
      return Campera
    } if (tipo === "TAPADO") {
      return Tapado
    } if (tipo === "CHAQUETA") {
      return Chaqueta
    }
  }

  /*
  
    setPrendaId(id) {
      this.setState({ idSet: id });
      setTimeout(() => {
        this.localProductos(this.state);
      }, 150);
    }
  */

  localProductos(state) {

    this.props.history.push({

      pathname: '/productos',
      state: state,

    })

  }

}

export default Prendas;