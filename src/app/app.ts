import { Component, signal, AfterViewInit,  OnInit, ViewEncapsulation } from '@angular/core';
import { delay } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { LoadingService } from './shared/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    SpinnerComponent
  ],
  encapsulation: ViewEncapsulation.None,
})
export class App implements AfterViewInit, OnInit {
  protected readonly title = signal('.:InterConexion Agro:.');

  showLoading = false;

  constructor(private loading: LoadingService) {}

  ngOnInit(): void {
     this.initLoading();
  }

  ngAfterViewInit(): void {
    // window.onscroll = function () {
    //   const scrollPage = document.getElementById('toolbar-fixed');
    //   if (window.scrollY > 0 && scrollPage) {
    //     scrollPage.classList.add('fixed-header')
    //   } else if (scrollPage) {
    //     scrollPage.classList.remove('fixed-header');
    //   }
    // };
  }

  initLoading(): void {
    this.loading.loading$.pipe(delay(0)).subscribe((loading) => {
      this.showLoading = loading;
    });
  }
}
