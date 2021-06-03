import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Subscription } from 'rxjs'
import { Iclientes } from 'src/app/Interfaces/clientes';
import { VentasService } from '../../services/ventas.service';
import { FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  Http !: Subscription;
  constructor(private formBuilder: FormBuilder,
    private ListVentas: VentasService,) { }

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
    return this.registerForm.get('IdPersona')
  }

  registerForm = this.formBuilder.group({
    IdVendedor: ['', [Validators.required]],
    vendedor: ['', [Validators.required]],
    IdCliente: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    Documento: ['', [Validators.required]],
    Tipo: ['', [Validators.required]],
    Nombre: ['', [Validators.required]],
    IdPersona: ['', [Validators.required]]
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
      console.log(datos.value)
      this.registerForm.get('vendedor').setValue(datos.value.Nombre);
      this.registerForm.get('IdVendedor').setValue(datos.value.IdPersona);
      this.registerForm.get('Nombre').setValue("");
      this.registerForm.get('IdPersona').setValue("")
    } else {
      console.log(datos.value)
      this.registerForm.get('cliente').setValue(datos.value.Nombre);
      this.registerForm.get('IdCliente').setValue(datos.value.IdPersona);
      this.registerForm.get('Nombre').setValue("");
      this.registerForm.get('IdPersona').setValue("")
    }
  }



}
