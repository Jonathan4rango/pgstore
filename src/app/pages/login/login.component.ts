import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router  } from '@angular/router';
import { MenuComponent } from "../../components/menu/menu.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MenuComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  // constructor(private fb: FormBuilder) {}
  // Inyecciones
  errorMessage = '';
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
}


onSubmit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { name, password } = this.loginForm.value;


  this.authService.login(name, password).subscribe({
    next: () => {
      this.router.navigate(['/homepage']); // Cambia por tu ruta principal protegida
    },
    error: (err) => {
      this.errorMessage = 'Credenciales incorrectas';
      console.error(err);
    }
  });
}

}
