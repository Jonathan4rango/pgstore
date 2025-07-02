import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-registro',
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
@Input() mensaje!: string;
@Output() notificarPadre = new EventEmitter<string>();

enviarMensaje(){
  this.notificarPadre.emit('mensaje del hijo');
}
}
