import { TestBed } from '@angular/core/testing';
import { SQLiteService } from './sqlite.service'; // Asegúrate de importar el servicio correctamente
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('SQLiteService', () => {
  let service: SQLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLiteService, SQLite] // Proporciona el servicio aquí
    });
    service = TestBed.inject(SQLiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
