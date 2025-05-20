import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ShippingService } from '../../services/shipping.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '../../../users/services/users.service';
import { Usuario, UsuarioResponse, UsuariosResponse } from '../../../users/models/usuario.model';
import { Shipping,Ruta} from '../../models/shipping.model';

@Component({
  selector: 'app-shipping-create',
  templateUrl: './shipping-create.component.html',
  styleUrls: ['./shipping-create.component.css'],
  imports: [CommonModule,RouterModule,NgSelectModule,FormsModule,ReactiveFormsModule,],
})
export class ShippingCreateComponent implements OnInit {
  shippingForm!: FormGroup;
  submitted = false;
  users: any[] = [];
  rutas: any[] = [];
  usersTipo: any[] = [];
  usersFiltradosTipo: any[] = [];
  usersFiltrados: any[] = []; 
  rutasFiltradas: any[] = []; 
  searchTerm: string = '';
  searchTermTipo: string = '';
  searchRutas: string = '';

   Usuario : Usuario = {
    id_usuario: 0,
    nombre: '',
    email: '',
    tipo: 'cliente',
    estado:'activo',
  };
   Envio : Shipping = {
      id_envio : 0,
      id_usuario : 0, 
      id_transportista : 0, 
      id_ruta : 0 ,
      peso : 0,
      ancho : 0,
      alto : 0 ,
      largo : 0,
      tipo_producto : '' ,
      direccion_destino : '',
      estado : 'En espera',
      fecha_creacion : new Date(),
      fecha_actualizacion : new Date(),
  };
  Rutas : Ruta = {
    id_ruta: 0,
    origen: '',
    destino: '',
    distancia: 0,
    tiempo_estimado: 0,
    estado: 'activo',
  }
  constructor(private fb: FormBuilder, private shippingService: ShippingService,private UserService : UserService ) {}
  
  ngOnInit(): void {
   this.shippingForm = this.fb.group({
      id_usuario: [null, Validators.required],
      id_transportista: [null, Validators.required],
      id_ruta: [null, Validators.required],
      peso: [null, [Validators.required, Validators.min(0.1)]],
      ancho: [null, [Validators.required, Validators.min(0.1)]],
      alto: [null, [Validators.required, Validators.min(0.1)]],
      largo: [null, [Validators.required, Validators.min(0.1)]],
      tipo_producto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      direccion_destino: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
    });

     this.cargarUsuario();
     this.cargarRutas();
     this.cargarUsuarioByTipo("transportista");
  }

  get f() {
    return this.shippingForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;
    if (this.shippingForm.invalid) return;
    this.shippingService.createShipping(this.shippingForm.value).subscribe({
      next: () => {
        alert('Orden de envío registrada correctamente.');
        this.shippingForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        alert('Error al registrar envío: ' + (err.error?.error || err.message));
      }
    });
  }
  cargarUsuario(): void {
      this.UserService.getUsers().subscribe({
        next: (response) => {
          this.users = response;
          this.usersFiltrados = response; 
        },
        error: (error) => {
          console.error('Error al cargar clientes:', error);
        }
      });
    }

   cargarRutas(): void {
    this.shippingService.getrutas().subscribe({
      next: (response) => {
         this.rutas = response.map(ruta => ({
        ...ruta,
        label: `${ruta.origen} - ${ruta.origen} - ${ruta.destino}`
          }));
          this.rutasFiltradas = [...this.rutas];
      },
      error: (error) => {
        console.error('Error al cargar las rutas:', error);
      }
    });
  }

    cargarUsuarioByTipo(tipo: string): void {
      this.UserService.getUserByTipo(tipo).subscribe({
        next: (response) => {
          this.usersTipo = response;
          this.usersFiltradosTipo = response;
        },
        error: (error) => {
          console.error('Error al cargar usuarios por tipo:', error);
        }
      });
  }

  filtrarUsuarioByTipo(): void {
    const term = this.searchTermTipo.trim().toLowerCase();
    if (!term) {
      this.usersFiltradosTipo = [...this.usersTipo];
      return;
    }
    this.usersFiltradosTipo = this.usersTipo.filter(user =>
      user.nombre.toLowerCase().includes(term)
    );
  }

  filtrarRutas(): void {
    const term = this.searchRutas.trim().toLowerCase();
    if (!term) {
      this.rutasFiltradas = [...this.rutas];
      return;
    }
    this.rutasFiltradas =  this.rutas.filter(rutas =>
      rutas.origen.toLowerCase().includes(term)
    );
  }

 filtrarUsuario(): void {
  const term = this.searchTerm.trim().toLowerCase();
  if (!term) {
    this.usersFiltrados = [...this.users];
    return;
  }
  this.usersFiltrados = this.users.filter(user =>
    user.nombre.toLowerCase().includes(term)
  );
}


}
