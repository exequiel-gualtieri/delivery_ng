import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HeaderService } from '../../core/services/header.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrl: './legals.component.scss',
  standalone: true,
  imports: [RouterModule]
})
export class LegalsComponent implements OnInit, OnDestroy {
  
  headerService = inject(HeaderService);
  
  constructor(private app: AppComponent) { }
 
  ngOnInit(): void {
    this.app.toShowTabs = false;
    this.headerService.titulo.set('Términos Legales');
  }
  ngOnDestroy(): void {
    this.app.toShowTabs = true;
  }
}

  