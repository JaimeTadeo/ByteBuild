import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  passwordRequirements = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.createPasswordStrengthValidator()
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.registroForm.get('password')?.valueChanges.subscribe(val => {
      this.updatePasswordRequirements(val);
    });
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
      
      return !hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol 
        ? { passwordStrength: true } 
        : null;
    };
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null 
      : { mismatch: true };
  }

  updatePasswordRequirements(password: string): void {
    this.passwordRequirements = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
    };
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  registrarConGoogle(): void {
    console.log('Registro con Google');
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      this.http.post('/api/registro', formData).subscribe({
        next: (response) => {
          this.router.navigate(['/verificacion']);
        },
        error: (error) => {
          console.error('Error de registro:', error);
        }
      });
    }
  }
}