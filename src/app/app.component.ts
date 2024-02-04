import { Component, WritableSignal, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'SilviaCrece';
  toShowHeader: Boolean = true;
  toShowTabs: Boolean = true;

}
