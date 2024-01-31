import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from '../../core/components/contador-cantidad/contador-cantidad.component';
import { Producto } from '../../core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';
import { Router, RouterModule } from '@angular/router';
import { PerfilService } from '../../core/services/perfil.service';
import { NUMERO_TELEFONO } from '../../core/constants/telefono';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, RouterModule]
})
export class CarritoComponent implements OnInit {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService);
  perfilService = inject(PerfilService);
  router = inject(Router);

  productosCarrito: Producto[] = [];

  subtotal: number = 0;
  delivery: number = 100;
  total: number = 0;
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.headerService.titulo.set('Carrito');
    this.cartService.carrito.forEach(async itemCarrito => {
      const res = await this.productosService.getById(itemCarrito.idProducto);
      if(res) this.productosCarrito.push(res);
      console.log(this.productosCarrito);
      this.calcularInformacion();
    })
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminarProducto(idProducto);
  }

  calcularInformacion () {
    this.subtotal = 0;
    for (let index = 0; index < this.cartService.carrito.length; index++) {
      this.subtotal += this.productosCarrito[index].precio * this.cartService.carrito[index].cantidad;
    }
    this.total = this.subtotal + this.delivery;
  }

  cambiarCantidadProducto(id:number,cantidad:number) {
    this.cartService.cambiarCantidadProducto(id,cantidad);
    this.calcularInformacion();
  }

  async enviarMensaje() {
    let pedido = '';

    for (let index = 0; index < this.cartService.carrito.length; index++) {
      const producto = await this.productosService.getById(this.cartService.carrito[index].idProducto);
      pedido += `◼ ${this.cartService.carrito[index].cantidad} X ${producto?.nombre}
`
    }

    const mensaje = `
Hola! Soy ${this.perfilService.perfil()?.nombre}, y quiero hacer el siguiente pedido:
${pedido}
Teléfono: ${this.perfilService.perfil()?.telefono}
La dirección de envío es: ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrega}
Muchas gracias
    `
    const link = `https://wa.me/${NUMERO_TELEFONO}?text=${encodeURI(mensaje)}`
    console.log(mensaje);
    window.open(link,'_blank');
    this.dialog.nativeElement.showModal();
  }

  finalizarPedido() {
    this.cartService.vaciarCarrito();
    this.dialog.nativeElement.close();
    this.router.navigate(['/']);
  }

  editarPedido() {
    this.dialog.nativeElement.close();
  }

}
