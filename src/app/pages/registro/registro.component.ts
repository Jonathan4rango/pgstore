import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceCompartidoService } from '../../service-compartido.service';
import { Perfil } from '../../models/perfil.model';
@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  login_Registro!: FormGroup;
  perfiles: { id: string; nombre: string }[] = [];
  constructor(private fb: FormBuilder,
    private serviceCompartido: ServiceCompartidoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    
    this.login_Registro = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      adress: ['', [Validators.required, Validators.minLength(3)]],
      perfil: ['', Validators.required] 
    });
    this.cargarPerfiles();
    
}

guardar(){
  if (this.login_Registro.valid) {
    const usuario = {
      id: this.login_Registro.value.id, // Sigue siendo string
      password: this.login_Registro.value.password,
      name: this.login_Registro.value.name,
      lastName: this.login_Registro.value.last_name, // 🔥 Corregido: Sin guion bajo
      adress: this.login_Registro.value.adress,
      perfil: this.login_Registro.value.perfil
      // ❌ NO enviar `x`, porque es autoincrementable en la BD
    };

    this.serviceCompartido.registrarUsuario(usuario).subscribe({
      next: (response) => {
        console.log('✅ Usuario registrado con éxito:', response);
      },
      error: (error) => {
        console.error('❌ Error al registrar usuario:', error);
      },
      complete: () => {
        console.log('⏳ Proceso de registro finalizado.');
      }
    });
  } else {
    console.log('⚠️ Formulario inválido, revisa los campos.');
  }
}

cargarPerfiles(): void {
  this.serviceCompartido.getPerfiles().subscribe({
    next: (data) => {
      this.perfiles = data.map(p => ({
        id: p.cod_perfil,
        nombre: p.name_perfil
      }));
    },
    error: (err) => {
      console.error('❌ Error al cargar perfiles:', err);
    }
  });
}


}
