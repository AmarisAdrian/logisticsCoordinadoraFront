import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
    userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
        this.userName = user?.nombre || user?.email || 'Usuario';
    }
  }

  logout() {
    this.authService.logout();
  }
}
