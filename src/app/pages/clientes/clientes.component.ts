import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { Iclientes } from 'src/app/Interfaces/clientes';
import { ClientesService } from '../../services/clientes.service';
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  ListaClientes: Iclientes[];
  public personaDel: string;

  Http !: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private ListCliente: ClientesService,


  ) { }

  ngOnInit(): void {
  }

  // Se declaran los elementos del componente para accederlos desde el codigo JS.
  get documento() {
    return this.registerForm.get('documento')
  }
  get nombre() {
    return this.registerForm.get('nombre')
  }
  get apellido() {
    return this.registerForm.get('apellido')
  }
  get genero() {
    return this.registerForm.get('genero')
  }
  get tipo() {
    return this.registerForm.get('tipo')
  }

  get editDocumento() {
    return this.registerForm.get('editDocumento')
  }
  get editNombre() {
    return this.registerForm.get('editNombre')
  }
  get editApellido() {
    return this.registerForm.get('editApellido')
  }
  get editGenero() {
    return this.registerForm.get('editGenero')
  }
  get editTipo() {
    return this.registerForm.get('editTipo')
  }
  get IdDocumento(){
    return this.registerForm.get('IdDocumento')
  }

  // se crea el grupo de formulario para asignar validaciones.
  registerForm = this.formBuilder.group({
    documento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    editDocumento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    editNombre: ['', [Validators.required]],
    editApellido: ['', [Validators.required]],
    editGenero: ['', [Validators.required]],
    editTipo: ['', [Validators.required]],
    IdDocumento: ['',[Validators.required]]

  });

  // Funcion para llamar el servicio de API

  ListarCLientes() {
    this.Http = this.ListCliente.listarClientes()
      .subscribe((res: any) => {
        this.ListaClientes = res.data
      })
  }

  // Funcion para crear personas--
  CrearPersona(datos: any) {
    const oPersona: Iclientes = {
      ID: 0,
      DOCUMENTO: datos.value.documento,
      NOMBRE: datos.value.nombre,
      APELLIDO: datos.value.apellido,
      SEXO: datos.value.genero,
      ESTADO: 0,
      TIPO: datos.value.tipo,
    }

    this.Http = this.ListCliente.CrearPersona(oPersona)
      .subscribe((res: any) => {
        alert(res.message);
        this.registerForm.get('documento').setValue("");
        this.registerForm.get('nombre').setValue("");
        this.registerForm.get('apellido').setValue("");
        this.registerForm.get('genero').setValue("");
        this.registerForm.get('tipo').setValue("");
        this.ListarCLientes();
      })

  }

  //Funcion para seleccionar la persona y pasarlo al Modal a ser modificado

  SeleccionEditarPersona(datos: any) {
    this.registerForm.get('editDocumento').setValue(datos.DOCUMENTO);
    this.registerForm.get('editNombre').setValue(datos.NOMBRE);
    this.registerForm.get('editApellido').setValue(datos.APELLIDO);
    this.registerForm.get('editGenero').setValue(datos.SEXO);
    this.registerForm.get('editTipo').setValue(datos.TIPO);

  }

  SeleccionEliminarPersona(datos: any) {
    this.personaDel = datos.NOMBRE + " " + datos.APELLIDO;
    this.registerForm.get('IdDocumento').setValue(datos.DOCUMENTO);

  }

  // Funcion para realizar la actualizacion de los datos
  ActualizarPersona(datos: any) {
    const oPersona: Iclientes = {
      ID: 0,
      DOCUMENTO: datos.value.editDocumento,
      NOMBRE: datos.value.editNombre,
      APELLIDO: datos.value.editApellido,
      SEXO: datos.value.editGenero,
      ESTADO: 0,
      TIPO: datos.value.editTipo,
    }

    this.Http = this.ListCliente.ActualizarCliente(oPersona)
      .subscribe((res: any) => {
        alert(res.message);
        this.registerForm.get('editDocumento').setValue("");
        this.registerForm.get('editNombre').setValue("");
        this.registerForm.get('editApellido').setValue("");
        this.registerForm.get('editGenero').setValue("");
        this.registerForm.get('editTipo').setValue("");
        this.ListarCLientes();
      })
  }

  //Funcion para eliminar de la lista una persona
  EliminarPersona(datos: any) {
    this.Http = this.ListCliente.EliminarPersona(datos.value.IdDocumento)
      .subscribe((res: any) => {
        this.ListarCLientes();
      })
  }

}
