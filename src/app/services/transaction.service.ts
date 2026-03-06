import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TransactionModel } from "../models/transaction.model";
import { DashboardModel } from "../models/dashboard.model";

@Injectable({providedIn:'root'})
export class TransactionService{
    private apiUrl = 'http://localhost:8080/api/transaction';

    constructor(private http: HttpClient){}

    getAll(): Observable<TransactionModel[]>{
        return this.http.get<TransactionModel[]>(this.apiUrl);
    }
    
    getById(id: number): Observable<TransactionModel>{
        return this.http.get<TransactionModel>(`${this.apiUrl}/${id}`);
    }

    getDashboard(): Observable<DashboardModel>{
        return this.http.get<DashboardModel>(`${this.apiUrl}/dashboard`);
    }

    create(transaction: Partial<TransactionModel>): Observable<TransactionModel>{
        return this.http.post<TransactionModel>(this.apiUrl, transaction);
    }

    update(id: number, transaction: Partial<TransactionModel>): Observable<TransactionModel>{
        return this.http.put<TransactionModel>(`${this.apiUrl}/${id}`, transaction)
    }

    delete(id: number): Observable<void>{
         return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}