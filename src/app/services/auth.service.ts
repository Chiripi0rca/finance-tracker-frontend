import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthResponse,LoginRequest, RegisterRequest } from "../models/auth.model";

@Injectable({ providedIn: 'root'})
export class AuthService{
    private apiUrl= 'http://localhost:8080/api/auth';


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
        return localStorage.getItem('token')
    }

    loggout(): void {
        localStorage.removeItem('token')
    }

    isLoggedIn(): boolean{
        return this.getToken() !==null;
    }
}



