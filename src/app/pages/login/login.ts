import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/auth.model';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    private authserive = inject(AuthService);
    private router = inject(Router);

    loginData: LoginRequest ={
      email: '',
      password: ''
    }

    onLogin(){
      this.authserive.login(this.loginData).subscribe({
        next: (response) => {
          this.authserive.saveToken(response.token);
          this.authserive.saveRefreshToken(response.refreshToken);
          this.router.navigate(['/dashboard'])
        },
      });
    }

    toRegister(){
      this.router.navigate(['/register']);
    }
  
}
