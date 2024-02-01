import { Component, effect, inject, signal } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  headerService = inject(HeaderService);
  claseAplicada = signal('');
  tituloMostrado = signal('');
  
  esconderTitulo = effect(() => {
    if(this.headerService.titulo()) {
      
      this.claseAplicada.set('fade-out');
    }
  },{allowSignalWrites:true});

  mostrarTituloNuevo(e:AnimationEvent) {
    console.log(e.animationName.includes('fade'));
    if(e.animationName.includes('fade')) {
      
      this.tituloMostrado.set(this.headerService.titulo());
      this.claseAplicada.set('fade-in');
      setTimeout(() => this.claseAplicada.set(''), 250);
    }
  }

}
