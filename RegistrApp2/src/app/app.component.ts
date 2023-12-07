import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLiteService } from 'src/service/SQLite/sqlite.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(    
    private platform: Platform,
    private sqlite: SQLiteService) {
      this.initializeApp();
    }

  initializeApp(){
    this.platform.ready().then(() => {
      this.sqlite.createTab().then(()=>{
        this.sqlite.AddUser('Belen', '1234');
        this.sqlite.AddUser('Nicolas', '1234');
      });
    });
   }
}
