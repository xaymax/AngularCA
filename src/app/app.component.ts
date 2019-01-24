import { Component } from '@angular/core';
import { NgModel } from '../../node_modules/@angular/forms';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'semi-PWA';
}
