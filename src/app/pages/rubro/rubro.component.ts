import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto } from '../../core/interfaces/productos';
import { TarjetaArticuloComponent } from '../../core/components/tarjeta-articulo/tarjeta-producto.component';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss',
  standalone: true,
  imports: [TarjetaArticuloComponent, CommonModule, RouterModule]
})
export class RubroComponent {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  categoriasService = inject(CategoriasService);
  ac = inject(ActivatedRoute);
  productos: Producto[] = []

  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      if(params['id']){
        this.categoriasService.getById(parseFloat(params['id']))
        .then(categoria => {
          if(categoria) this.productos = categoria.productos,
          this.headerService.titulo.set(categoria.nombre);
        });
      }
    });
  }
}
