import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../environments/api.url';
import { Iclientes } from '../Interfaces/clientes'

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) { }

  consultarArticulos(id_Articulo)
  {
    return this.http.get(api.articulos+"?Id_Articulo="+id_Articulo);
  }


}
