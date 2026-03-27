import { Component } from '@angular/core';
import { loaderService } from '../../Core/Services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  constructor(public loaderService: loaderService) {}
}
