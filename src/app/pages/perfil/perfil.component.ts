import { Component, OnInit, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Perfil } from '../../core/interfaces/perfil';
import { PerfilService } from '../../core/services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PerfilComponent implements OnInit {
  headerService = inject(HeaderService);
  perfilService = inject(PerfilService);
  router = inject(Router);

  ngOnInit(): void {
    this.headerService.titulo.set('Perfil');
    if(this.perfilService.perfil()) {
      this.perfil = {...this.perfilService.perfil()!}
    }
  }

  perfil:Perfil = {
    nombre: '',
    direccion: '',
    telefono: '',
    detalleEntrega: ''
  }

  guardarDatosPerfil() {
    this.perfilService.guardarDatos(this.perfil);
    this.router.navigate(['/']);
  }

}
