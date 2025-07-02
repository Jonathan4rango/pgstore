import { Component } from '@angular/core';
import { RegistroComponent } from "./registro/registro.component";
import { ServiceCompartidoService } from '../../service-compartido.service';

@Component({
  selector: 'app-formulario',
  imports: [RegistroComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
mensajePadre: string = 'Componente Padre';

mensaje: string = '';
recibirNotificacion(mensaje : string){
this.mensaje = mensaje;
}

servicioMensaje: string;

constructor(servicioCompartidoService: ServiceCompartidoService){
  this.servicioMensaje = servicioCompartidoService.obtenerMensaje();
}

}
