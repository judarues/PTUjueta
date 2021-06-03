import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../environments/api.url';
import { Iclientes } from '../Interfaces/clientes'
import { headers } from '../helpers/headers';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  // consumo de los servicios de la API REST
  listarClientes() {
    return this.http.get(api.clientes);
  }
  CrearPersona(datos: Iclientes) {
    return this.http.post(api.clientes, datos);
  }

  ActualizarCliente(datos: Iclientes) {
    return this.http.put(api.clientes, datos);
  }

  EliminarPersona(DOCUMENTO: number) {
    return this.http.put(api.clientes + "/" + DOCUMENTO, DOCUMENTO);
  }



}
