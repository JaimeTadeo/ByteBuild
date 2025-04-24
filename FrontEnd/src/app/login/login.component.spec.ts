import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';

@Component({
  selector: 'app-header',
  template: '',
  standalone: true,
})
class MockHeaderComponent {}

@Component({
  selector: 'app-navbar',
  template: '',
  standalone: true,
})
class MockNavbarComponent {}

describe('LoginComponent (Essential Tests - Updated HTML)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MockHeaderComponent,
        MockNavbarComponent,
        CommonModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    spyOn(router, 'navigate').and.stub();
    spyOn(component, 'loginWithGoogle').and.stub(); // Espiar el método de inicio de sesión con Google
    fixture.detectChanges();
  });

  // --- Prueba 1: Creación e Inicialización ---
  it('should create the component and initialize the login form', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
    expect(component.loginForm.valid).toBeFalse();
  });

  // --- Prueba 2: Validación del Formulario ---
  it('should validate form controls correctly (email required and format)', () => {
    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    // Caso 1: Email requerido
    emailControl.setValue('');
    emailControl.markAsTouched();
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.hasError('required')).toBeTrue();

    // Caso 2: Email formato inválido
    emailControl.setValue('texto-invalido');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.hasError('email')).toBeTrue();

    // Caso 3: Email válido y contraseña presente (Formulario válido)
    emailControl.setValue('test@example.com');
    passwordControl.setValue('micontraseña');
    expect(component.loginForm.valid).toBeTrue();
  });

  // --- Prueba 3: Lógica Principal (Submit Exitoso) ---
  it('onSubmit should set loading, simulate API call, and navigate on successful login', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'Password123!' });
    expect(component.loginForm.valid).toBeTrue();

    component.onSubmit();

    expect(component.loading).toBeTrue();
    expect(component.errorMessage).toBe('');

    tick(1500);

    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  }));
});