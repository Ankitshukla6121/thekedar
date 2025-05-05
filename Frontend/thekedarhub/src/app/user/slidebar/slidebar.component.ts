import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css'
})
export class SlidebarComponent {
  ngOnInit(): void {
    initFlowbite();
  }
}
