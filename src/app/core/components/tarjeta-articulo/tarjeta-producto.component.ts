import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/productos';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class TarjetaArticuloComponent {

  @Input({required:true}) producto!:Producto;

}
