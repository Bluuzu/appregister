import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/service/SharedService/shared.service';
import { SQLiteService } from 'src/service/SQLite/sqlite.service';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/service/LoginService/login.service';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  let sqliteServiceSpy: jasmine.SpyObj<SQLiteService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const sharedSpy = jasmine.createSpyObj('SharedService', ['setUser']);
    const sqliteSpy = jasmine.createSpyObj('SQLiteService', ['verifyUser']);
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
    const loginSpy = jasmine.createSpyObj('LoginService', ['setPassedLogin']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [
        { provide: SharedService, useValue: sharedSpy },
        { provide: SQLiteService, useValue: sqliteSpy },
        { provide: AlertController, useValue: alertSpy },
        { provide: LoginService, useValue: loginSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    // Obtener instancias espías
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    sqliteServiceSpy = TestBed.inject(SQLiteService) as jasmine.SpyObj<SQLiteService>;
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert if fields are empty on validateLog', async () => {
    // Espía para simular la función showAlert
    alertControllerSpy.create.and.resolveTo({ present: () => {} } as any);

    // Llamar a la función sin datos
    await component.validateLog();

    // Verificar que showAlert haya sido llamado
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Advertencia',
      message: 'Los campos no pueden estar vacios',
      buttons: ['OK']
    });
  });

  it('should navigate and set user on successful validation', async () => {
    const user = 'testUser';
    const pass = 'testPass';
  
    // Simular datos de usuario asignando valores directamente a las propiedades del componente
    component.username = user;
    component.password = pass;
  
    // Simular respuesta de verificación de usuario
    sqliteServiceSpy.verifyUser.and.resolveTo(true);
  
    // Simular navegación y llamada a setPassedLogin
    routerSpy.navigate = jasmine.createSpy().and.resolveTo(true);
  
    // Llamar a la función validateLog
    await component.validateLog();
  
    // Verificar que se llamaron las funciones y se realizó la navegación adecuadamente
    expect(sqliteServiceSpy.verifyUser).toHaveBeenCalledWith(user, pass);
    expect(sharedServiceSpy.setUser).toHaveBeenCalledWith(user);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/menu']);
    expect(loginServiceSpy.setPassedLogin).toHaveBeenCalledWith(true);
  });
});
