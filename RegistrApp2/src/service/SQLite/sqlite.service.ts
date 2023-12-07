import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {

  constructor(
    private sqlite: SQLite,) { }

  verifyUser(User: string, Pass: string): Promise<boolean> {
    return this.createDBA().then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM user WHERE user = ? AND password = ?', [User, Pass])
        .then(data => {
          return data.rows.length > 0; 
        })
        .catch(error => {
          console.error('Error al ejecutar consulta en SQLite', error);
          return false; 
        });
    })
    .catch(error => {
      console.error('Error al abrir la base de datos SQLite', error);
      return false; 
    });
  }

  createDBA() {
    return this.sqlite.create({
      name: 'RegApp.db',
      location: 'default'
    });
  }

  createTab() {
    return this.createDBA().then((db: SQLiteObject) => {
      if (db) { // Verifica si la base de datos SQLite se inicializó correctamente
        return db.executeSql(`
          CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            password TEXT
          )`, [])
          .then(() => {
            console.log('Tabla de credenciales creada');
          })
          .catch(error => console.error('Error al crear la tabla de credenciales', error));
      } else {
        console.error('La base de datos SQLite no se inicializó correctamente');
        return Promise.reject('Error: La base de datos SQLite no se inicializó correctamente');
      }
    }).catch(error => {
      console.error('Error al inicializar la base de datos en createTab()', error);
      return Promise.reject('Error: Problema al inicializar la base de datos SQLite');
    });
  }

  AddUser(User: string, Pass: string) {
    return this.createDBA().then((db: SQLiteObject) => {
      return db.executeSql('INSERT INTO user (user, password) VALUES (?, ?)', [User, Pass])
        .then(() => {
          console.log('Credencial insertada con éxito.');
        }).catch(error => console.error('Error al insertar las credenciales', error));
    });
  }
}
