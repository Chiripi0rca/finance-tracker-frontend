import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { DashboardModel } from '../../models/dashboard.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables} from 'chart.js';


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit{

  @ViewChild ('graficaBarras') graficasBarras! : ElementRef;
  @ViewChild ('graficaDona') graficaDona!: ElementRef;

   private transaction = inject(TransactionService);
   private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

   dashboard: DashboardModel = {
    totalIngresos: 0,
    totalEgresos: 0,
    balance: 0
   }

   private chartBarras: Chart | null = null;
   private chartDona: Chart | null = null;

   loadDashboard(){ 
    this.transaction.getDashboard().subscribe({
      next:(response) =>{
        console.log('Dashboard response', response);
        this.dashboard = {...response};
        this.cdr.detectChanges();
        this.crearGraficas();
      },
    });
   }

   crearGraficas(){
    //eliminar graficas anteriores
    if(this.chartBarras) this.chartBarras.destroy();
    if (this.chartDona) this.chartDona.destroy();

    //crear grafica barras
    this.chartBarras = new Chart (this.graficasBarras.nativeElement,{
      type: 'bar',
      data: {
        labels: ['Ingresos', 'Egresos', 'Balance'],
        datasets: [{
          label: 'Resumen del mes',
          data: [this.dashboard.totalIngresos, this.dashboard.totalEgresos, this.dashboard.balance],
           backgroundColor: ['#4CAF50', '#F44336', '#2196F3']
        }]
      },
      options:{
        responsive: true,
        plugins: {
          legend: { display: false}
        }
      }
    });

    //crear grafica dona
    this.chartDona = new Chart (this.graficaDona.nativeElement,{
      type: 'doughnut',
      data: {
        labels: ['Ingresos', 'Egresos'],
        datasets: [{
          data: [this.dashboard.totalIngresos, this.dashboard.totalEgresos],
          backgroundColor: ['#4CAF50', '#F44336']
        }]
      },
      options: {
         responsive: true
      }
    });
   }

   ngOnInit(): void{
    this.loadDashboard();
   }
   
   ngAfterViewInit(): void {}

   toTransaction(){
    this.router.navigate(['/transactions'])
   }
}
