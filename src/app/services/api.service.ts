import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('🔗 API Service iniciado - URL:', this.apiUrl);
  }

  testarConexao(): Observable<any> {
    console.log('🔄 Testando conexão com:', `${this.apiUrl}/teste-conexao`);
    return this.http.get(`${this.apiUrl}/teste-conexao`);
  }

  createCliente(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientes/create`, user);
  }

  readCliente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/read`);
  }

  readClienteById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/read/${id}`);
  }

  updateCliente(id: number, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, user);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
    checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes/read`).pipe(
      map((clientes: any[]) => {
        const emailExists = clientes.some(cliente => 
          cliente.email?.toLowerCase() === email.toLowerCase()
        );
        return { exists: emailExists };
      })
    );
  }

}