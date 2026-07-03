import { Component, OnDestroy, Renderer2  } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styles: ``,
  standalone: true,
  imports: [MatProgressSpinnerModule],
})

export class SpinnerComponent implements OnDestroy {

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'loading-overlay');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'loading-overlay');
 }

}
