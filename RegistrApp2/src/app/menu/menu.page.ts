import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SharedService } from '../../service/SharedService/shared.service';
import { LoginService } from 'src/service/LoginService/login.service';
interface MenuItem {
  label: string;
  icon: string;
  destination: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})

export class MenuPage implements OnInit {
  username: string | null = null;
  menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'Home', destination: 'menu' },
    { label: 'Asignaturas', icon: 'book', destination: 'asignaturas' },
    { label: 'Cerrar Sesión', icon: 'exit', destination: 'Cerrar Sesion' }
  ];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private menuController: MenuController,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.username = this.sharedService.getUser();
  }

  irA(destino: string) {
    const rutasValidas = [,'asignaturas'];

    if (rutasValidas.includes(destino)) {
      this.router.navigate([destino]);
    } else {
      this.router.navigate(['pagina-de-error']);
    }
  }
  onLogout() {
    this.login.passedLogin();
    this.router.navigate(['/home'])
  }

  cerrarMenu() {
    this.menuController.close();
  }
}
