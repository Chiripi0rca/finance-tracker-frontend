import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TipoCategoria,TransactionModel } from '../../models/transaction.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-transactions',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule,
     MatButtonModule, MatCardModule, MatTableModule, MatSelectModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  
  cargando: boolean = true;
  editando: boolean = false;
  editId: number = 0;
 

  //paginacion
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;


  filtroCategoria: TipoCategoria | undefined = undefined;
  filtroMes: string = '';

  categorias: TipoCategoria []= ['COMIDA', 'RENTA', 'ENTRETENIMIENTO', 'SALUD', 'NOMINA', 'TRANSPORTE', 'OTROS'];
 

  private transaction = inject(TransactionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['categoria', 'descripcion', 'monto', 'tipoTransaccion', 'createdAt', 'updatedAt', 'acciones'];
  transactionData: TransactionModel = {
    id: 0,
    monto: 0,
    descripcion: '',
    categoria: 'OTROS',
    tipoTransaccion: 'EGRESO',
    createdAt: '',
    updatedAt: ''
  }

  MovimientoData: TransactionModel[] = []

  create(){
    if (!this.transactionData.monto){
      alert('El monto es obligatorio')
      return;
    }

    if (!this.transactionData.categoria.trim()){
      alert('La categoria es obligatoria')
      return;
    }

    if(!this.transactionData.tipoTransaccion){
      alert('Le tipo de movimiento es obligatorio')
      return;
    }

    this.transaction.create(this.transactionData).subscribe({
       next: (response) => {
         console.log('El movimiento ha sido creado', response);
         alert('Su movimiento fue creado');
        
         this.resetValue();

         window.location.reload();
       },
       error: (error) =>{
          console.error('Error al craer el movimiento', error);
          alert('Error al crear el movimiento');
       }
    });
  }


  loadTransactions(){
    this.transaction.getAll(this.currentPage, this.pageSize, this.filtroCategoria, this.filtroMes).subscribe({
      next: (Response) => {
        this.MovimientoData = Response.content;
        this.totalPages = Response.totalPages;
        this.totalElements = Response.totalElements;
        this.cdr.detectChanges();
        }
    })
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  onDelete(id: number){
    if(!confirm('Estas seguro que quieres eliminar esta tarea?')){
      return;
    }
    this.transaction.delete(id).subscribe({
      next: () => {
        this.MovimientoData = this.MovimientoData.filter( m => m.id !== id);
        alert('Movimiento eliminado');
        this.loadTransactions();
      },
      error: (error) => {
        console.error('Error al eliminar el movimeinto', error);
        alert('Error al eliminar el movimiento')
      }
    });
  }

  onEdit(item: TransactionModel){
      this.editando = true;
      this.editId = item.id;
      this.transactionData = {...item};
  }

  onUpdate(){
    this.transaction.update(this.editId, this.transactionData).subscribe({
      next: () => {
        alert('se ha editado con exito tu movimiento')
        this.editando = false;
        this.editId= 0;
        this.resetValue();
        this.loadTransactions();
      },
      error: (error) => {
        alert('error al editar el movimiento');
        console.error('Error al editar el movimiento', error)
      }
    });
  }

  cancelar(){
    this.editId = 0;
    this.editando = false;
    this.resetValue();
  }


  resetValue(){
             this.transactionData ={
            id: 0,
             monto: 0,
             descripcion: '',
             categoria: 'OTROS',
             tipoTransaccion: 'EGRESO',
             createdAt: '',
             updatedAt: ''
         };
  }

  toDashboard(){
    this.router.navigate(['/dashboard']);
  }

  nextPage() {
    if (this.currentPage > this.currentPage - 1){
      this.currentPage++;
      this.loadTransactions();
    }
  }

  prevPage(){
    if (this.currentPage > 0){
      this.currentPage--;
      this.loadTransactions();
    }
  }

  aplicarFiltros(){
    this.currentPage = 0;
    this.loadTransactions();
  }

  limpiarFiltros(){
    this.filtroCategoria = undefined;
    this.filtroMes = '';
    this.currentPage = 0;
    this.loadTransactions();
  }

  exportCSV(){
    this.transaction.exportCSV().subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transacciones.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

}
