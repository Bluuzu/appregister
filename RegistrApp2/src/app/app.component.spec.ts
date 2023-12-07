import { TestBed } from '@angular/core/testing';
import { SQLiteService } from '../service/SQLite/sqlite.service'; // Asegúrate de importar el servicio correctamente
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AppComponent', () => {
  let service: SQLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLiteService, SQLite] // Asegúrate de incluir el servicio en los proveedores
    });
    service = TestBed.inject(SQLiteService);
  });

  it('should create the app', () => {
    // Prueba aquí el comportamiento que verificas en AppComponent
    expect(service).toBeTruthy();
  });
});
