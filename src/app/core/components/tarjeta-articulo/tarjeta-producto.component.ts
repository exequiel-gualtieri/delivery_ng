import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class TarjetaArticuloComponent implements OnInit {

  @Input({required:true}) producto!:Producto;
  @Input() template:string = 'search';
  gridLayout: Boolean = true;
  showBtn:Boolean = true; 
  showPrice:Boolean = true;
  showIngridients:Boolean = true;
  
  ngOnInit(): void {
    switch (this.template) {
      case 'search':
        this.gridLayout = false;
        this.showBtn = false;
        this.showPrice = false;
        this.showIngridients = true;
        break;
      case 'category':
        this.gridLayout = true;
        this.showBtn = true;
        this.showPrice = true;
        this.showIngridients = false;
        break;
      default:
        this.template = 'category';
        this.ngOnInit();
        break;
    }
  }
  
}
