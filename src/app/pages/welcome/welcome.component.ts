import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  standalone: true,
  imports: [RouterModule]

})
export class WelcomeComponent implements OnInit, OnDestroy {
  
  constructor(private app: AppComponent) { }
 
  ngOnInit(): void {
    this.app.toShowHeader = false;
    this.app.toShowTabs = false;
  }
  ngOnDestroy(): void {
    this.app.toShowHeader = true;
    this.app.toShowTabs = true;
  }

}
