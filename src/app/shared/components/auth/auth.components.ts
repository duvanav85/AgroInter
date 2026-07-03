import { Component, signal, ElementRef, HostListener, viewChild, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import HeaderMenuComponent from '../header-menu/header-menu.component';
import { CookieService } from 'ngx-cookie-service';
import { cookieOptions } from '../../../shared/components/header-menu/cookieOptions';
import { cookiesList } from '../../../shared/enums/cookiesList.enum';

import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.components.html',
  styleUrl: './auth.components.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class AuthComponents
{
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // ── Parallax state ─────────────────────────
  readonly bgTransform = signal('translate(0px, 0px) scale(1.08)');

  // ── Password visibility ────────────────────
  readonly showPassword = signal(false);

  // ── Form ───────────────────────────────────
  readonly form = this.fb.group({
    email:       ['', [Validators.required, Validators.email]],
    password:    ['', [Validators.required, Validators.minLength(6)]],
    rememberMe:  [false],
  });

  readonly isSubmitting = signal(false);
  readonly submitted    = signal(false);
  readonly loginError   = signal(false);

  private _cookieService = inject(CookieService);

  // ── Parallax mouse tracking ────────────────
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const el = (event.currentTarget as HTMLElement);
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((event.clientX - left) / width  - 0.5) * 22;
    const y = ((event.clientY - top)  / height - 0.5) * 14;
    this.bgTransform.set(`translate(${x}px, ${y}px) scale(1.08)`);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.bgTransform.set('translate(0px, 0px) scale(1.08)');
  }

  // ── Actions ────────────────────────────────
  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  // ── Form submission ─────────────────────────

  onSubmit(): void {
    this.submitted.set(true);
    this.loginError.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);

    // TODO: reemplazar por la llamada real al servicio de autenticación
    setTimeout(() => {
      this.isSubmitting.set(false);
      const loginSuccessful = true; // placeholder: aquí iría la respuesta real del backend
      if (loginSuccessful) {
        this._cookieService.set(
          cookiesList.backgroundBlock,
          'true',
          cookieOptions
        );
        this.router.navigate(['']);
      } else {
        this.loginError.set(true);
      }
      //console.log('Login payload:', this.form.value);
    }, 1500);
  }

  loginWithGoogle(): void {
    console.log('Google OAuth');
  }

  loginWithGithub(): void {
    console.log('GitHub OAuth');
  }
}
