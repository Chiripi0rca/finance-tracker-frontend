import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { DashboardModel } from '../../models/dashboard.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
   private transaction = inject(TransactionService);
   private router = inject(Router);

   dashboard: DashboardModel = {
    totalIngresos: 0,
    totalEgresos: 0,
    balance: 0
   }

   loadDashboard(){ 
    this.transaction.getDashboard().subscribe({
      next:(response) =>{
        console.log('Dashboard response', response);
        this.dashboard = response;
      },
    });
   }

   ngOnInit(): void{
    this.loadDashboard();
   }

   toTransaction(){
    this.router.navigate(['/transactions'])
   }
}
