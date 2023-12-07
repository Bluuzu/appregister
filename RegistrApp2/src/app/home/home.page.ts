import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { SharedService } from 'src/service/SharedService/shared.service';
import { SQLiteService } from 'src/service/SQLite/sqlite.service';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/service/LoginService/login.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  constructor( 
    private router:Router,
    private shared: SharedService,
    private sqlite: SQLiteService,
    private alertControlle: AlertController,
    private loginServ: LoginService
    ) { } 
    
    async showAlert(message: string) {
      const alert = await this.alertControlle.create({
        header: 'Advertencia',
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async validateLog(){
      if (!this.username || !this.password){
        this.showAlert("Los campos no pueden estar vacios");
        return;
      }
      

      this.sqlite.verifyUser(this.username, this.password).then((validate)=>{
        if(validate){
          this.shared.setUser(this.username);
          this.router.navigate(['/menu'])
          this.loginServ.setPassedLogin(true);
        } else {
          this.showAlert("Usuario o contraseña incorrecta")
        }
      })
    }
    
    navigateToForgot() {
      this.router.navigate(['/forgot']);
    }
}
