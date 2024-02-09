import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Busqueda } from '../../core/interfaces/busqueda';
import { ProductosService } from '../../core/services/productos.service';
import { TarjetaArticuloComponent } from "../../core/components/tarjeta-articulo/tarjeta-producto.component";
import { Producto } from '../../core/interfaces/productos';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-buscar',
    templateUrl: './buscar.component.html',
    styleUrl: './buscar.component.scss',
    standalone: true,
    imports: [CommonModule, FormsModule, TarjetaArticuloComponent, RouterModule]
})
export class BuscarComponent implements OnInit, AfterViewInit {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  productos:WritableSignal<Producto[]> = signal([]);
  @ViewChild('myInput') inputElement!: ElementRef;
  
  ngOnInit(): void {
    this.headerService.titulo.set('Buscar');
    this.productosService.getAll().then(res => this.productos.set(res));
    
  }

  ngAfterViewInit() {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }
  
  parametrosBusqueda: Busqueda = {
    texto: '',
    aptoCeliaco: false,
    aptoVegano: false,
  }

  async buscar() {
    this.productos.set(await this.productosService.buscar(this.parametrosBusqueda));    
  }
}
