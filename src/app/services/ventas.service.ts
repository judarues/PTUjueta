import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../environments/api.url';
import { Iclientes } from '../Interfaces/clientes'

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  //Consumo de API Para los pedidos

  BuscarPersona(datos: Iclientes, tipo: any) {

    return this.http.get(api.ventas+"/"+datos+"?Tipo="+tipo);
  }



}
