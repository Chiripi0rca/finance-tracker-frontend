import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthResponse,LoginRequest, RegisterRequest } from "../models/auth.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root'})
export class AuthService{


    private apiUrl = `${environment.apiUrl}/api/auth`;


    constructor(private http:HttpClient){}

    register(Request: RegisterRequest): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, Request);
    }

    login (Request: LoginRequest): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, Request);
    }
    
    saveToken(token: string): void{
        localStorage.setItem('token', token);
    }

    getToken(): string | null{
        return localStorage.getItem('token');
    }

    saveRefreshToken (resfresToken: string): void {
        localStorage.setItem('refreshToken', resfresToken);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    loggout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }

    isLoggedIn(): boolean{
        return this.getToken() !==null;
    }

    refresh(refreshToken: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken});
    }
}



