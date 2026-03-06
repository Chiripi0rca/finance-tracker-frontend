import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../models/auth.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authservice = inject(AuthService);
  private router = inject(Router);

  registerData: RegisterRequest = {
    email: '',
    password: ''
  }
  
  onRegister(){
    this.authservice.register(this.registerData).subscribe({
      next: (Request) => {
        this.authservice.saveToken(Request.token);
        this.router.navigate(['/dashboard'])
      },
    });
  }
}
