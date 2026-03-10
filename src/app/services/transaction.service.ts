import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { TipoCategoria, TransactionModel } from "../models/transaction.model";
import { DashboardModel } from "../models/dashboard.model";
import { environment } from "../../environments/environment";
import { PageResponse } from "../models/page.models";
@Injectable({providedIn:'root'})
export class TransactionService{

    private apiUrl =`${environment.apiUrl}/api/transaction`;


    constructor(private http: HttpClient){}

    getAll(page: number = 0, size: number = 10, categoria?: TipoCategoria, mes?:string): Observable<PageResponse<TransactionModel>>{
        let params = new HttpParams()
               .set('page', page)
               .set('size', size);

        if (categoria) params = params.set('categoria', categoria);
        if (mes) params = params.set('mes', mes);
        return this.http.get<PageResponse<TransactionModel>>(this.apiUrl, { params});
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

    exportCSV(): Observable<string>{
        return this.http.get(`${this.apiUrl}/export/csv`, {responseType: 'text'});
    }
}