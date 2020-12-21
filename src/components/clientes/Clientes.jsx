import React from 'react';
import API from '../service/api';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActionArea from '@material-ui/core/CardActionArea';
import SearchIcon from '@material-ui/icons/Search';
import Customer from '../../Img/customer.png';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class Clientes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
      clientesFiltrados: [],
      idSet: '',
    };

  }

  componentDidMount() {


    API.get('tienda/api/clientes/all').then((res) => this.setState({ clientes: res, clientesFiltrados: res }))
      .catch((error) => console.log(error));

    //this.setState({ idLocal: this.props.location.state.idSet })

    /*const paramReq = {
      id: this.props.location.state.idSet
    }
*/
    /*API.get('/productosById', paramReq).then((res) => this.setState({ productos: res, productosFiltrados: res }))
      .catch((error) => console.log(error));
*/

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
              <h1>Listado de Clientes</h1>
            </div>
          </div>
        </div>

  <div className='row container bloque'>
                <div  id='boton' className="col-sm-6"> 
                <Button variant="contained" color="primary" className="ml-5" onClick={() => this.handleAdd()} >
                      Agregar
                    </Button>
                </div>
                <div class="col-sm-6"> 
                  <div id='search' className="marginBotDrop"  >
                    <div id='buscador'>
                    <TextField label="Buscar por nombre" color="primary" onChange={(e) => this.textBuscador(e)} />
                    <SearchIcon className="searchAlign lupa" />
                    </div>
                  </div>

                </div>       
        </div>
 
        
        <div id="clientes" className="container marginTopProd">
          {this.renderizarClientes()}
        </div>

      </div>
    )
  }

  textBuscador(e) {
    if (e.target.value !== '') {
      this.setState({ clientesFiltrados: this.state.clientesFiltrados.filter((clientes) => clientes.nombre.toLowerCase().includes(e.target.value.toLowerCase())) });
    } else {
      this.setState({ clientesFiltrados: this.state.clientes })
    }
  }


renderizarClientes() {
  return (
    <div className="row">
      {this.state.clientesFiltrados.map((cliente) => this.transformarClientes(cliente))}
    </div>
  )
}

transformarClientes(cliente) {

  return (

    <div className="col-sm-5 col-md-5 col-lg-3 mt-2" key={cliente.id}>
      <Card>
        <CardActionArea>
          <img src={Customer} alt="Foto" className="img-thumbnail" />
          <CardContent>
            <Typography variant="h5" component="h2">
              {cliente.nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {cliente.apellido}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className="row marginBottom">
          <div id="eliminar">
          <Button variant="contained" color="secondary" className="ml-5" onClick={() => this.eliminarCliente(cliente.id)}>
            Eliminar
              </Button>
              </div>
              <div>
          <Button variant="contained" color="secondary" className="ml-5" onClick={() => this.editCliente(cliente.id, cliente.nombre, cliente.apellido)}>
            Editar
              </Button>
              </div>
        </div>
      </Card>
    </div>
  )

}

handleAdd(){
  return (

    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      width: 800,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Nombre',
        text: '',
        inputValidator: (text) => {
          if (!text) {
            return 'Necesitas agregar un nombre!'
          }
        }
      },
      {
        title: 'Apellido',
        text: '',
        inputValidator: (text) => {
          if (!text) {
            return 'Necesitas agregar apellido!'
          }
        }
      }
    ]).then((result) => {
      if (result.value) {

        this.crearNuevoCliente(result.value);

        Swal.fire({
          title: 'Cliente Creado!',
          html: ` Nombre: ${result.value[0]}<br />
                Apellido: ${result.value[1]}<br />         
                `,
          confirmButtonText: 'Listo!'
        })
      }
    })

  )
}

eliminarCliente(id) {
  API.postDos('tienda/api/cliente/delete/' + id)
    .then(() => this.componentDidMount())
    .catch((error) => console.log(error))
}

crearNuevoCliente(values) {

  const body = {
    nombre: values[0],
    apellido: values[1],
  }

  API.post('tienda/api/cliente/new', body)
    .then(() => this.componentDidMount())
    .catch((error) => console.log(error))

}

editCliente(id, nombre, apellido){

  this.setState({
    idSet: id
  })

  return (
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Editar nombre:',
        text: `${nombre}`,
        inputValidator: (text) => {
          if (!text) {
            return 'Necesitas agregar un nombre!'
          }
        }
      },
      {
        title: 'Editar apellido:',
        text: `${apellido}`,
        inputValidator: (text) => {
          if (!text) {
            return 'Necesitas agregar un apellido!'
          }
        }
      }
    ]).then((result) => {
      if (result.value) {

        this.updateCliente(result.value);

        Swal.fire({
          title: 'Cliente editado!',
          html: ` Nombre: ${result.value[0]}<br />
                apellido: ${result.value[1]}<br />              
                `,
          confirmButtonText: 'Listo!'
        })
      }
    })
  )
}

updateCliente(values){
  const body = {
    nombre: values[0],
    apellido: values[1]
  }

  API.put('tienda/api/cliente/update/' + this.state.idSet, body)
    .then(() => this.componentDidMount())
    .catch((error) => console.log(error))
}

/*
  handleAdd() {
    return (

      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4']
      }).queue([
        {

          title: 'Producto',
          text: '',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar la marca del producto!'
            }
          }

        },
        {
          title: 'Descripcion de el producto',
          text: '',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar una descripcion al producto!'
            }
          }
        },
        {
          title: 'Precio del producto',
          text: '',
          input: 'number',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar el precio del producto!'
            }
          }
        },
        {
          title: 'Cantidad de productos',
          text: 'Campo vacio es igual a 0 productos',
          input: 'number'
        }
      ]).then((result) => {
        if (result.value) {
          this.crearProductoNuevo(result.value);
          this.avatarBackgroud(result.value[3]);

          Swal.fire({
            title: 'Producto listo!',
            html: ` Marca: ${result.value[0]}<br />
                  Descripcion: ${result.value[1]}<br />
                  Precio: ${result.value[2]} <br />
                  Cantidad: ${result.value[3]} <br />                  
                  `,
            confirmButtonText: 'Listo!'
          })
        }
      })
    )
  }

  crearProductoNuevo(valores) {

    const body = {
      marca: valores[0],
      descripcion: valores[1],
      precio: valores[2],
      cantidad: valores[3],
      id_local: this.state.idLocal,
    }

    API.post('/addProducto', body)
      .then(() => this.componentDidMount())
      .catch((error) => console.log(error))

  }

  eliminarProd(id) {

    Swal.fire({
      title: '¿Seguro quieres eliminar el producto?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '!Producto eliminado!',
          '',
          'success'
        )

        API.post(`/producto/${id}`).then((res) => this.componentDidMount()).catch((error) => console.log(error));
      }
    })


  }

  avatar(marca) {

    return (
      marca.charAt(0).toUpperCase()
    )

  }

  avatarBackgroud(cantidad) {

    if (cantidad <= 10) {
      return (
        "bg-danger"
      )
    } else if (cantidad > 10 && cantidad < 50) {
      return (
        "bg-warning"
      )
    } else {
      return (
        "bg-success"
      )
    }
  }
/*
  textBuscador(e) {

    if (e.target.value !== '') {
      this.setState({ productosFiltrados: this.state.productosFiltrados.filter((productos) => productos.marca.toLowerCase().includes(e.target.value.toLowerCase())) });
    } else {
      this.setState({ productosFiltrados: this.state.productos })
    }
  }

  volver() {

    this.props.history.push({

      pathname: '/locales'

    })

  }

*/
}

export default Clientes;