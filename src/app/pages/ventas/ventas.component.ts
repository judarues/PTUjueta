import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Subscription } from 'rxjs'
import { Iclientes } from 'src/app/Interfaces/clientes';
import { VentasService } from '../../services/ventas.service';
import { FormBuilder, Validators } from '@angular/forms'
import { ArticulosService } from '../../services/articulos.service'
import { NgForm } from '@angular/forms'
import { IArticulos } from 'src/app/Interfaces/articulos';
import { IDetalleArticulo, IEncabezado } from 'src/app/Interfaces/pedidos';



@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  detallePedido !: IDetalleArticulo[];
  index!: number;

  Http !: Subscription;
  constructor(private formBuilder: FormBuilder,
    private ListVentas: VentasService,
    private listArticulos: ArticulosService) { }

  ngOnInit(): void {

  }

  get IdVendedor() {
    return this.registerForm.get('IdVendedor')
  }
  get vendedor() {
    return this.registerForm.get('vendedor');
  }

  get IdCliente() {
    return this.registerForm.get('IdCliente');
  }
  get cliente() {
    return this.registerForm.get('cliente');
  }
  get Documento() {
    return this.registerForm.get('Documento');
  }
  get Tipo() {
    return this.registerForm.get('Tipo');
  }
  get Nombre() {
    return this.registerForm.get('Nombre');
  }
  get IdPersona() {
    return this.registerForm.get('IdPersona');
  }
  get idArticulo() {
    return this.registerForm.get('idArticulo');
  }
  get Articulo() {
    return this.registerForm.get('Articulo');
  }
  get precio() {
    return this.registerForm.get('precio');
  }
  get cantidad() {
    return this.registerForm.get('cantidad');
  }
  get indexID() {
    return this.registerForm.get('indexID');
  }
  get editidArticulo() {
    return this.registerForm.get('editidArticulo');
  }
  get editArticulo() {
    return this.registerForm.get('editArticulo');
  }
  get editprecio() {
    return this.registerForm.get('editprecio');
  }
  get editcantidad() {
    return this.registerForm.get('editcantidad');
  }


  registerForm = this.formBuilder.group({
    IdVendedor: ['', [Validators.required]],
    vendedor: ['', [Validators.required]],
    IdCliente: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    Documento: ['', [Validators.required]],
    Tipo: ['', [Validators.required]],
    Nombre: ['', [Validators.required]],
    IdPersona: ['', [Validators.required]],
    idArticulo: ['', [Validators.required]],
    Articulo: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    indexID: ['', [Validators.required]],
    editidArticulo: ['', [Validators.required]],
    editArticulo: ['', [Validators.required]],
    editprecio: ['', [Validators.required]],
    editcantidad: ['', [Validators.required]],

  });

  //consultar persona
  BuscarPersona(datos: any, tipo: string) {
    this.Http = this.ListVentas.BuscarPersona(datos.value.Documento, tipo)
      .subscribe((res: any) => {
        if (res.result == 200) {
          this.registerForm.get('Nombre').setValue(res.data.NOMBRE);
          this.registerForm.get('IdPersona').setValue(res.data.ID)
        } else {
          alert("No se encuentra Registro!");
        }
      })
  }
  // Sleccionar las personas para la creacion del Pedido
  SeleccionarPersona(datos: any, tipo: any) {
    if (tipo == "vendedor") {

      this.registerForm.get('vendedor').setValue(datos.value.Nombre);
      this.registerForm.get('IdVendedor').setValue(datos.value.IdPersona);
      this.registerForm.get('Nombre').setValue("");
      this.registerForm.get('IdPersona').setValue("")
    } else {

      this.registerForm.get('cliente').setValue(datos.value.Nombre);
      this.registerForm.get('IdCliente').setValue(datos.value.IdPersona);
      this.registerForm.get('Nombre').setValue("");
      this.registerForm.get('IdPersona').setValue("")
    }
  }
  // Funcion para COnsultar Articulos
  ConsultarArticulos(datos: any) {
    this.Http = this.listArticulos.consultarArticulos(datos.value.idArticulo)
      .subscribe((res: any) => {

        this.registerForm.get('Articulo').setValue(res.data.NOMBRE);
        this.registerForm.get('precio').setValue(res.data.VALOR_UNIDAD)
      })

  }

  //Funcion para agregar los articulos a la Tabla

  AgregarArticulo(data: any) {
    const oArticulo: IDetalleArticulo = {
      COD_ARTICULO: data.value.idArticulo,
      NOMBRE: data.value.Articulo,
      CANTIDAD: data.value.cantidad,
      VALOR_UNIDAD: data.value.precio,
      SUBTOTAL: data.value.cantidad * data.value.precio
    }


    let Detalle = JSON.parse(localStorage.getItem("DetallePedido"));
    if (Detalle != null) {
      Detalle.push(oArticulo);
      localStorage.setItem("DetallePedido", JSON.stringify(Detalle));
    } else {
      let nuevo = [oArticulo]
      localStorage.setItem("DetallePedido", JSON.stringify(nuevo));
    }
    this.registerForm.get('Articulo').setValue("");
    this.registerForm.get('precio').setValue("");
    this.registerForm.get('idArticulo').setValue("");
    this.registerForm.get('cantidad').setValue("");
    this.detallePedido = JSON.parse(localStorage.getItem("DetallePedido"));
  }

  // Funcion para insertar el pedido en la BD Encabezado y Detalle
  CrearPedido(data: any) {
    const encabezado: IEncabezado = {
      CLIENTE: data.value.IdCliente,
      VENDEDOR: data.value.IdVendedor
    }
    this.Http = this.ListVentas.CrearEncabezado(encabezado)
      .subscribe((res: any) => {
        let Detalle = JSON.parse(localStorage.getItem("DetallePedido"));
        this.Http = this.ListVentas.crearDetallePedido(Detalle)
          .subscribe((res: any) => {
            localStorage.removeItem('DetallePedido');
            alert("Pedido Creado Correctamente!")
            this.detallePedido = JSON.parse(localStorage.getItem("DetallePedido"));

          })
      })
  }

  SeleccionarLinea(data: IDetalleArticulo, index: any) {


    this.registerForm.get('editArticulo').setValue(data.NOMBRE);
    this.registerForm.get('editprecio').setValue(data.VALOR_UNIDAD);
    this.registerForm.get('editidArticulo').setValue(data.COD_ARTICULO);
    this.registerForm.get('editcantidad').setValue(data.CANTIDAD);
    this.registerForm.get('indexID').setValue(index);


  }
  // editar el articulo
  EditarLinea(data: any) {
    const linea: IDetalleArticulo[] = JSON.parse(localStorage.getItem("DetallePedido"));
    linea[data.value.indexID].NOMBRE = data.value.editArticulo;
    linea[data.value.indexID].COD_ARTICULO = data.value.editidArticulo;
    linea[data.value.indexID].CANTIDAD = data.value.editcantidad;
    linea[data.value.indexID].VALOR_UNIDAD = data.value.editprecio;
    linea[data.value.indexID].SUBTOTAL = data.value.editcantidad * data.value.editprecio;
    localStorage.setItem("DetallePedido", JSON.stringify(linea));
    this.detallePedido = JSON.parse(localStorage.getItem("DetallePedido"));
  }

  // Eliminar el articulo de la lista
  delItem(dato: any, indexid: any) {
    let Items: IDetalleArticulo[] = JSON.parse(localStorage.getItem("DetallePedido"));
    let newObj: IDetalleArticulo;
    let newArr: IDetalleArticulo[];
    if (Items != null) {
      Items.forEach((item, i) => {
        if (i != indexid) {
          if (newArr == null) {
            newArr = []
          }
          newObj = {
            COD_ARTICULO: item.COD_ARTICULO,
            NOMBRE: item.NOMBRE,
            CANTIDAD: item.CANTIDAD,
            VALOR_UNIDAD: item.VALOR_UNIDAD,
            SUBTOTAL: item.SUBTOTAL
          }
          newArr.push(newObj);
        }
      });
      if (newArr == null) {
        newArr = []
      }
      localStorage.setItem("DetallePedido", JSON.stringify(newArr))
    }
    this.detallePedido = JSON.parse(localStorage.getItem("DetallePedido"));
  }




}
