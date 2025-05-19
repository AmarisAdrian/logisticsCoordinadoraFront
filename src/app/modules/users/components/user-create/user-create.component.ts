import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.userService.register(this.userForm.value).subscribe({
      next: (res) => {
        alert('Usuario creado correctamente');
        this.userForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        alert('Error al crear usuario: ' + err.error?.error || err.message);
      }
    });
  }
}
