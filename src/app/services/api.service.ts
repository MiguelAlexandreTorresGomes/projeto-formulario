import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private authService = inject(AuthService);

  constructor(private http: HttpClient) {
  }

  testarConexao(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teste-conexao`);
  }

  createCliente(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientes/create`, user);
  }

  readCliente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes/read`);
  }

  readClienteById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.get(`${this.apiUrl}/clientes/read/${id}`, { headers });
  }
  updateCliente(id: string, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/clientes/update/${id}`, user);
  }

  deleteCliente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clientes/delete/${id}`);
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

  adminLogin(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/admin-login`, credentials);
  }

  private getAuthHeaders(): { [header: string]: string } {
    const token = this.authService.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  getClientesAutenticado(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes/read`, {
      headers: this.getAuthHeaders()
    });
  }
  
}