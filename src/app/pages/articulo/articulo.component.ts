import { Component, OnInit, inject, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/productos';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-articulo',
    templateUrl: './articulo.component.html',
    styleUrl: './articulo.component.scss',
    standalone: true,
    imports: [CommonModule,FormsModule,ContadorCantidadComponent]
})
export class ArticuloComponent  implements OnInit {

  headerService = inject(HeaderService);
  productoService = inject(ProductosService);
  cartService = inject(CartService);

  producto?: Producto;
  cantidad = signal(1);
  notas = "";
  
  ngOnInit(): void {
    this.headerService.titulo.set('Artículo');
  }

  constructor(private ac: ActivatedRoute, private router: Router) {
    ac.params.subscribe(param => {
      
      if(param['id']){
        this.productoService.getById(param['id']).then(producto => {
           this.producto = producto;
           this.headerService.titulo.set(producto!.nombre);
        })
      }
    })
  }

  agregarAlCarrito() {
    if(!this.producto) return;
    this.cartService.agregarProducto(this.producto?.id, this.cantidad(), this.notas);
    this.router.navigate(['/carrito'])
  }

}
