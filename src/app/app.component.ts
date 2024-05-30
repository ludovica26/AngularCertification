import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StepsComponent } from './steps/steps.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageCardComponent } from './image-card/image-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterModule, StepsComponent, ImageCardComponent, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Angular';
  title = "tesla-configurator"

}
