import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'app-contador-cantidad',
  templateUrl: './contador-cantidad.component.html',
  styleUrl: './contador-cantidad.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class ContadorCantidadComponent implements OnInit {
  
  numero = signal(1);

  @Input() cart:boolean = false;
  @Input() cantidadInicial = 1;
  @Output() cantidadCambiada = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<void>();

  ngOnInit(): void {
    this.numero.set(this.cantidadInicial)
  }


  actualizarNumero(diferencia:number) {
    this.numero.set(Math.max(this.numero()+diferencia,1));
    this.cantidadCambiada.emit(this.numero());
  }

  $removeItem() {
    this.removeItem.emit();
  }

}
